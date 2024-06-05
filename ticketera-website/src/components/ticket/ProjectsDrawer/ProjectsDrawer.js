import React, { useEffect, useState } from 'react'
import { Divider, IconButton } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { arrayTabsAddNew } from '../../../redux/actions/userInterfaceActions';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { getProjectTree } from '../../../redux/actions/projectActions';


export default function ProjectsDrawer(props) {
    const dispatch = useDispatch();

    const { arrayTabs } = useSelector((state) => state.ui, shallowEqual);
    const [projectTree, setProjectTree] = useState()

    useEffect(() => {
        dispatch(getProjectTree(props.ticketId)).then(res => {
            setProjectTree(res)
        })
    }, [])

    const handleGoToTicket = (e, ticketId) => {
        e.stopPropagation();

        let tabNew = new Object();
        tabNew.type = 0;
        tabNew.title = `Ticket ${ticketId}`;
        tabNew.id = ticketId;
        tabNew.index = arrayTabs.length;

        dispatch(arrayTabsAddNew(tabNew));
        props.handleCloseDrawer()
    }

    const createProjectName = (data) => {
        const description = data.descripcion ? ` - ${data.descripcion}` : '';
        const responsible = data.responsable ? ` - ${data.responsable}` : '';

        return data.ticket + description + responsible;
    }

    const collectTicketsId = (data, tickets = []) => {
        if (data.ticket) {
            tickets.push(data.ticket);
        }
        if (data.childrens) {
            data.childrens.forEach(child => collectTicketsId(child, tickets));
        }
        return tickets;
    };


    const TreeItemRecursive = ({ data }) => {
        return (
            <TreeItem onClick={(e) => { handleGoToTicket(e, data.ticket) }} itemId={data.ticket} label={createProjectName(data)}>
                {data.childrens && data.childrens.map(child => (
                    <TreeItemRecursive key={child.ticket} data={child} />
                ))}
            </TreeItem>
        );
    };


    return (
        <div style={{ margin: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Árbol de proyectos</h2>
                <IconButton onClick={props.handleCloseDrawer}>
                    <NavigateBeforeIcon />
                </IconButton>
            </div>
            <Divider />
            {projectTree ?
                <SimpleTreeView defaultExpandedItems={collectTicketsId(projectTree)} defaultSelectedItems={[props.ticketId]}>
                    <TreeItemRecursive data={projectTree} />
                </SimpleTreeView>
                :
                <></>
            }
        </div>
    )
}
