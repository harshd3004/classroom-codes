const getHostedClassrooms = (req, res) => {
    res.status(200).json({ message: "Hosted classrooms will go here" })
}

const createClassroom = (req, res) => {
    res.status(200).json({ message: "Create classroom will go here" })
}

module.exports = {
    getHostedClassrooms,
    createClassroom}