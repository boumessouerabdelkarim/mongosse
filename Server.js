let mongoose = require('mongoose');
const express = require("express");
const app = express();

const Person = require("./person/Person");
require("dotenv").config();


//Create a document instance using the Person constructor

const person = new Person({
  name: "John",
  age: 15,
  favoriteFoods: ["pizza", "checkin", "pasta"],
});
person
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.log(err));

//create a table of person
persons = [
  {
    name: "Mohamed ",
    age: 29,
    favoriteFoods: ["kosksi", "pizza", "escalope"],
  },
  {
    name: "Khaled ",
    age: 21,
    favoriteFoods: ["kosksi", "viande", "mange tout"],
  },
  {
    name: "miled",
    age: 31,
    favoriteFoods: ["ma9arouna", "pizza", "djej"],
  },
  {
    name: "oussama",
    age: 65,
    favoriteFoods: ["kosksi", "pizza", "escalope"],
  },
  {
    name: "hamza",
    age: 52,
    favoriteFoods: ["kosksi", "pizza", "escalope"],
  },
];

//Create Many Records with model.create()

Person.create(persons, (err, data) => {
  err ? console.log(err) : console.log("add successfu");
});

//Use model.find() to Search

Person.find({}, (err, data) => {
  err ? console.log(err) : console.log(data);
});

//Use model.findOne() to Return a Single Matching Document

Person.findOne({ favoriteFoods: "kosksi" }, (err, data) => {
  err ? console.log(err) : console.log(data);
});

//Use model.findById() to Search Your Database By _id

Person.findById({ _id: "630651b43f0fa5bea9fcec21" }, (err, data) => {
  err ? console.log(err) : console.log(data);
});

// Perform Classic Updates by Running Find, Edit, then Save
Person.findByIdAndUpdate(
  { _id: "630651b43f0fa5bea9fcec21" },
  { $push: { favoriteFoods: "makarouna" } },
  (err, data) => {
    err ? console.log(err) : console.log(data);
  }
);

//Perform New Updates on a Document Using model.findOneAndUpdate()

Person.findOneAndUpdate(
  { name: "hamza" },
  { $set: { age: 20 } },
  { new: true },
  (err, data) => {
    err ? console.log(err) : console.log(data);
  }
);

//Delete One Document Using model.findOneAndRemove

Person.findOneAndRemove({ name: "miled" }, (err, data) => {
  err ? console.log(err) : console.log("delete successfully");
});

////MongoDB and Mongoose - Delete Many Documents with model.remove()

Person.deleteMany({ name: "miled" }, (err, data) => {
  err ? console.log(err) : console.log("delete successfully");
});

//Chain Search Query Helpers to Narrow Search Results

Person.find({ favoriteFoods: "pizza" })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec((err, data) => {
    err ? console.log(err) : console.log(data);
  });

  //connection to database

const DBconnect = async () => {
    try {
      await mongoose.connect('mongodb+srv://karim:20714971abdo@abdelelkarim.vbgoppi.mongodb.net/?retryWrites=true&w=majority');
  
      console.log("Data base is connected");
    } catch (error) {
      console.log(error);
    }
  };

  DBconnect()



app.listen(5000, (err) => {
err ? console.log(err) : console.log("server is running");
});
