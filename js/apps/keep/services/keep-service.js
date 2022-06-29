import {storageService} from '../../../general-service/async-storage-service.js'


export const NotesService = {
    getById,
    query,
    remove,
    save,
    get,
    getEmptyText,
    getEmptyImg,
    getEmptyTodo,
    getEmptyVideo,
    // saveMany
}

const NOTES_KEY = 'notes';
_crateNotes()

function getById() {
    return Promise.resolve(notes)
}

function query() {
    return storageService.query(NOTES_KEY)
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function save(note) {
    if (note.id) return storageService.put(NOTES_KEY, note)
    else return storageService.post(NOTES_KEY, note)
}

function _crateNotes(){
return query()
.then(notes=>{
    if(!notes || !notes.length){ 
    notes = []
    notes.push(..._crateNote())
    storageService.postMany(NOTES_KEY,notes)
    }
    return notes
})

}

function _crateNote(){
    const notes = [
        {
         id: "n101",
         type: "noteTxt",
         isPinned: false,
         info: {
         txt: "Fullstack Me Baby!"
         }
        },
        {
         id: "n102",
         type: "noteImg",
         isPinned: false,
         info: {
         url: "../../../imgs/1.jpg",
         title: "Bobi and Me"
         },
         style: {
         backgroundColor: "#00d"
         }
        },
        {
         id: "n103",
         type: "noteTodos",
         isPinned: false,
         info: {
         label: "Get my stuff together",
         todos: [
         { txt: "Driving liscence", doneAt: null,},
         { txt: "Coding power", doneAt: null,}
         ]
         }
        },
        {
        id: "n104",
        type: "noteVideo",
        isPinned: false,
        info: {
            url: "../../../video/1.mp4",
            title: "Get video here",
            }
        }
        ]
        return notes
}


    // function getNextCarId(carId) {
    //     return storageService.query(CARS_KEY)
    //         .then(cars => {
    //             const idx = cars.findIndex(car => car.id === carId)
    //             return (idx < cars.length-1)? cars[idx + 1].id : cars[0].id
    //         })
    // }
    
    function getEmptyText() {
        return {
            id: "",
            type: "noteTxt",
            isPinned: false,
            info: {
            txt: ''
        }
    }
}
    function getEmptyImg() {
        return {
            id: "",
            type: "noteImg",
            isPinned: false,
            info: {
            url: "",
            title: "Bobi and Me"
            },
            style: {
            backgroundColor: "#00d"
            }
        }
    }

    function getEmptyTodo() {
        return {
            id: "",
            type: "noteTodos",
            isPinned: false,
            info: {
            label: "Get my stuff together",
            todos: [
            { txt: "", doneAt: null },            ]
            }
        }
    }

    function getEmptyVideo() {
        return {
            id: "",
            type: "noteVideo",
            isPinned: false,
            info: {
                url: "",
                title: "Get video here",
                }
            }
}
    
    // function _createCars() {
    //     let cars = utilService.loadFromStorage(CARS_KEY);
    //     if (!cars || !cars.length) {
    //         cars = [];
    //         cars.push(_createCar('Audu Mea', 300));
    //         cars.push(_createCar('Fiak Ibasa', 120));
    //         cars.push(_createCar('Subali Pesha', 100));
    //         cars.push(_createCar('Mitsu Bashi', 150));
    //         utilService.saveToStorage(CARS_KEY, cars);
    //     }
    //     return cars;
    // }
    
    // function _createCar(vendor, maxSpeed = 250) {
    //     const car = {
    //         id: utilService.makeId(),
    //         vendor,
    //         maxSpeed,
    //     };
    //     return car;
    // }
    