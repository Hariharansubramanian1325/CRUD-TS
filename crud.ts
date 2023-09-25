const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const filePath = './trainees.json';
type User = {
    id?: string,
    name: string,
    age: number
}
type Update = {
    name?: string,
    age?: number
}
const getTrainees = (): User[] => {
    if (!fs.existsSync(filePath)) return [];
    const unparsedTrainees = fs.readFileSync(filePath, 'utf-8');
    if (unparsedTrainees.length === 0) return [];
    return JSON.parse(unparsedTrainees);
}
const addTrainee = (trainee: User) => {
    trainee.id = uuidv4();
    const trainees: User[] = getTrainees();
    trainees.push(trainee);
    fs.writeFileSync(filePath, JSON.stringify(trainees));
}
const deleteTrainee = (id: string) => {
    const trainees: User[] = getTrainees();
    const traineesAfterDeletion: User[] = trainees.filter(trainee => trainee.id !== id);
    fs.writeFileSync(filePath, JSON.stringify(traineesAfterDeletion));
}
const updateTrainee = (id: string, updatedData: Update) => {
    let trainees = getTrainees();
    const index = trainees.map(trainee => trainee.id).indexOf(id);
    if (index == -1) return;
    trainees[index] = { ...trainees[index], ...updatedData };
    fs.writeFileSync(filePath, JSON.stringify(trainees));
}
module.exports = { getTrainees, addTrainee, updateTrainee, deleteTrainee };