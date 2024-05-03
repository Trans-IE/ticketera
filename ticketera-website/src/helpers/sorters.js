const fullNameSorter = (a, b) => {
    const lastNameA = a.nombre_completo.split(", ")[0];
    const lastNameB = b.nombre_completo.split(", ")[0];

    return lastNameA.localeCompare(lastNameB);
}

module.exports = { fullNameSorter }