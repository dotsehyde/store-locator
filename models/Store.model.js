const mongoose = require('mongoose');
const geocoder = require('../middleware/geocoder');
const StoreSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: [true, 'Please add a storeId'],
        unique: true,
        trim: true,
        maxlength: [10, 'StoreId must be less than 10 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//Geocode & create location (Mongoose middleware)
StoreSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode
    }
    //Do not save address in DB
    this.address = undefined;
    next();
});

module.exports = mongoose.model('Store', StoreSchema);