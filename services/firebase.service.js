const fb = require('../config/firebase.config')
const db = fb.firestore()

function getPriceByService(service){
    return new Promise((resolve, reject)=>{
        db.collection('trip').doc('cars').get()
        .then(snapshot=>{
            let carsInfo = snapshot.data();
            carsInfo = Array.from(carsInfo.price).filter(item=>item.trip == service);
            resolve(carsInfo);
        })
        .catch(err=>{
            reject(err)
        })
    })    
}

function getPriceForTariff() {
    return new Promise((resolve, reject)=>{
        db.collection('trip').doc('cars').get()
        .then(snapshot=>{
            let carsInfo = snapshot.data();
            carsInfo = Array.from(carsInfo.price);
            resolve(carsInfo);
        })
        .catch(err=>{
            reject(err)
        })
    })
}


async function saveEquiry(data){
    console.log(data);
    return await db.collection('enquiry').add({
        id: data?.bookID,
        name: data?.name,
        mobile: data?.mobile,
        email: data?.email,
        type: data?.service,
        service: data?.serviceType,
        pickupLocation: data?.pickupLocation,
        dropLocation: data?.dropLocation,
        createdAt: fb.firestore.Timestamp.now()
    })
}


async function saveBooking(data){
    console.log(data);
    const docRef = await db.collection('booking').add({
        bill: "0",
        name: data?.name,
        id: data?.bookID,
        mobile: data?.mobile,
        email: data?.email,
        type: data?.service,
        service: data?.serviceType,
        pickupLocation: data?.pickupLocation,
        dropLocation: data?.dropLocation,
        pickupDate: data?.pickupDate,
        pickupTime: data?.pickupTime,
        carType: data?.vehicle?.cName,
        price: data?.vehicle?.price,
        distance: data?.distance,
        createdAt: fb.firestore.Timestamp.now()
    })
    return docRef.id
}

module.exports = {
    getPriceByService,
    saveEquiry, 
    saveBooking,
    getPriceForTariff
}