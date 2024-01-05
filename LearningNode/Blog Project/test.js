const mongoose = require('mongoose');

const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost:27017/blog_project');

BlogPost.create({
    title: 'The Mythbuster’s Guide to Saving Money on Energy Bills',
    body: `If you have been here a long time, you might remember when I went on ITV Tonight to
    dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money
    topics because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery
    opens up. You know those bullet-point lists. You start spotting them everywhere at this time of year.
    They go like this: `
})
    .then(blogpost => {
        console.log(blogpost);
    })
    .catch(error => {
        console.error(error);
    });

BlogPost.find({
    title: 'The Mythbuster’s Guide to Saving Money on Energy Bills'
})
    .then(blogpost => {
        console.log(blogpost);
    })
    .catch(error => {
        console.error(error);
    });

var id = "659851f3926e22044f109b7a";
BlogPost.findById(id)
    .then(blogpost => {
        console.log(blogpost);
    })
    .catch(error => {
        console.error(error);
    });

BlogPost.findByIdAndUpdate(id, {
    title: 'Updated Title'
})
    .then(blogpost => {
        console.log(blogpost);
    })
    .catch(error => {
        console.log(error);
    });

BlogPost.findByIdAndDelete(id)
    .then(blogpost => {
        console.log(blogpost);
    })
    .catch(error => {
        console.log(error);
    });