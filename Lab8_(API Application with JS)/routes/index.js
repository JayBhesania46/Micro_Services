import venue from "./venues.js";


const constructorMethod = app => {
app.use('/', venue);

app.use('*', (req, res) => {
    res.status(404).render('error', {title: "Error", error: "That route cannot be accessed."});
});
};

export default constructorMethod;