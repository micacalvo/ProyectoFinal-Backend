export class ContenedorMemoria {

    constructor() {
        this.elementos = []
    }

    getById(id) {
        const elem = this.elementos.find(elem => elem.id == id)
        return elem || false;
    }

    getAll() {
        return [...this.elementos]
    }

    save(elem) {
        let newId
        if (this.elementos.length == 0) {
            newId = 1
        } else {
            newId = this.elementos[this.elementos.length - 1].id + 1
        }

        const newElem = { ...elem, id: newId }
        this.elementos.push(newElem)
        return newElem
    }

    update(elem) {
        const newElem = { ...elem, id: Number(elem.id) }
        const index = this.elementos.findIndex(p => p.id == elem.id)
        if (index == -1) {
            return false
        } else {
            this.elementos[index] = newElem
            return newElem
        }
    }

    deleteById(id) {
        const index = this.elementos.findIndex(elem => elem.id == id)
        if (index == -1) {
            return false
        } else {
            return this.elementos.splice(index, 1)
        }
    }

    deleteAll() {
        this.elementos = []
    }
}

