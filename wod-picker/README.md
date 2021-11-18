# NAME

WoD[i] Wod-picker



# USER EXPERIENCE

- Home page : 
    - User can have access to the log In form 
    - User can create an account
    - User can lear a bit more about the app and his creators
- Log-in page :
    - User can fill a form with his username and password
- Create account page :
    - User can create an account and see what cool features he will have access to
- Exercises list page :
    - Once logged in user can see/search the list of all the exercises created
- Exercice details page :
    - User can see all the details of the exercise and access some extra ressources
- Create exercise page :
    - If user is registered as a PT he can create a specific exercise
- Exercise edit page :
    - If user is registered as a PT he can edit or delete an exercise
- WoD list page :
    - Once logged in user can see/search the list of all the WoD created
- WoD details page :
    - User can see all the details of the WoD 
- Create WoD page :
    - User can create a WoD by accessing the exercises librairy
- WoD edit page :
    - User can edit or delete a WoD



# BACKLOG

User profile:
- see my profile
- upload my profile picture
- see other users profiles
- upload WoD from an other user
- list of WoD created by the user
- list the WoD the user has completed

PT profile:
- see my profile
- upload my profile picture
- see other users and PT profiles
- list of WoD and exercise created by the PT
- upload exercises from other PT
- list the users the PT has in charge

Search WoDs : 
- User can search for WoD based on how he feels
- User can ask the app to generate a random WoD


# MODELS
- EXERCISE : {
    name: String,
    difficultyRate: Number,
    numberOfRep: Number,
    targetedMuscle: Array,
    img: String,
    link: String,
}
- WORKOUT : {
    name: String,
    environement: String,
    exercises: {
        type: Object.Types.ObjectId,
        ref: 'EXERCISES'
    }
    rounds: Number,
    duration: Number,
    intensity: Number,
}
- USER : {
    userName: {
        type: String
        require: true,
        unique: true
    }
    email: {
        type: String
        require: true,
        unique: true
    }
    password: {
        type: String,
        require: true,
    }
    personalTrainer: Boolean -> feature
}

# RELATION
WOD > EXERCISE
Wod includes exercises from the DB
When creating the WoD you can select some exercises from the EXERCISES collection

# ROUTES
- MAIN
    - Get / > index.hbs
    - Get /auth/register > register.hbs
    - Post /auth/register > register.hbs
    - Get /auth/login > log-in-form.hbs
    - Post /auth/login > log-in-form.hbs


- EXERCISE.ROUTES.JS
    - Get /exercise > exercises-list.hbs
    - Get /exercise/create > exercise-create.hbs
    - Post /exercise/create> exercise-create.hbs
    - Get /:exercise/deatails > exercise-details.hbs
    - Get /:exercise/edit > exercise-edit.hbs
    - Post /:exercise/edit > exercise-edit.hbs
    - Post /:exercise/delete 
- WOD.ROUTES.JS
    - Get /wod > wod-list.hbs
    - Get /wod/create > wod-create.hbs
    - Post /wod/create> wod-create.hbs
    - Get /:wod/deatails > wod-details.hbs
    - Get /:wod/edit > wod-edit.hbs
    - Post /:wod/edit > wod-edit.hbs
    - Post /:wod/delete > wod-delete.hbs

# VIEWS
- index.hbs
    - nav bar
    - log in
    - register
- log-in.hbs
    - username
    - password
    - enter btn
- register.hbs
    - username
    - email
    - password
    - send btn
- about.hbs
    - about the app
    - about the creators
- layout.hbs
    - html standards
    - {{{body}}}
- error.hbs
- not-found.hbs
> exercises
    - exercises-list.hbs
    - exercise-create.hbs
    - exercise-details.hbs
    - exercise-edit.hbs
> wod
    - wod-list.hbs
    - wod-create.hbs
    - wod-details.hbs
    - wod-edit.hbs

# FEATURES
- CRUD WoD
- CRUD exercises
- CRUD user profile
- Register as PT or Normal
- Search for a Wod > Intensity / Muscles Group
- Pick a random WoD

# EXTERNAL API
- https://wger.de/en/software/api

# RESOURCES AND RESEARCH
- https://www.thewodgenerator.com/
- https://whimsical.com/
- https://www.heropatterns.com/
- https://animista.net/
- https://www.colorzilla.com/gradient-editor/
- https://unsplash.com/
- https://undraw.co/illustrations


