<template>
    <div class="welcome-view">
        <header class="header">
            <div class="header__group">
                <h2>
                    Teacher or Educators?
                </h2>
                <p>
                    Create your own courses and lesson. Make it public or private. Add homework. Grade your students.
                </p>
            </div>
            <div class="header__group">
                <h2>
                    Students
                </h2>
                <p>
                    Enroll to public courses or join private courses by invites
                </p>
            </div>
            <div class="header__group--100">
                <router-link to="/register" class="hero-header--button">Signup Now</router-link>
            </div>
        </header>
    </div>
</template>

<style lang="scss" scoped>

.header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.header__group {
    flex-basis: 50%;
    max-width: 400px;
    padding: 1rem;
    box-sizing: border-box;
    text-align: center;
}

.header__group--100 {
    flex-basis: 100%;
    text-align: center;
}

// .hero-header {
//     margin-top: 5rem;
//     text-align: center;

//     .hero-header--text {
//         margin-bottom: 1.5rem;
//     }

//     .hero-header--button {
//         padding: 0.8rem;
//         text-decoration: none;
//         color: inherit;
//         background-color: #333;
//         color: white;
//         border-radius: 0.2rem;
//         font-size: .8rem;
//     }
// }

// @media only screen and (max-width: 500px) {
//     .hero-header {
//         font-size: .8rem;

//         .hero-header--text {
//             margin-bottom: 1rem;
//         }

//         .hero-header--button {
//             font-size: .6rem;
//             padding: .6rem;
//         }
//     }
// }

</style>