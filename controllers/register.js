
const handleRegister = (req, res, bcrypt, db) => {
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password);

    if (!email || !name || !password) {
        return res.status(400).json("inocorrect format!!!");
    }
    
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into("login")
        .returning("email")
        .then(loginEmail => {

            return trx('users')
            .returning("*") //this will return all the columns instead of us selecting and returning manually
            .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date()    
            })
            .then(user => res.json(user[0]))
        })
        .then(trx.commit)
        .catch(trx.rollback)
        
    })
    .catch(err => res.status(400).json("unable to register :("))
        
}

module.exports = {
    handleRegister: handleRegister
};