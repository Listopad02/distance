// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyCB0YaTBmI1f_sjhxvCoEiwafVcLD6H86w",
  authDomain: "distance-ea18b.firebaseapp.com",
  projectId: "distance-ea18b",
  storageBucket: "distance-ea18b.appspot.com",
  messagingSenderId: "606739653445",
  appId: "1:606739653445:web:f5dbba23bf0b43c53bd42c",
  measurementId: "G-5D5FQE79XD"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const modal = document.getElementById("my_modal");
const btn = document.getElementById("btn_modal_window");
const span = document.getElementsByClassName("close_modal_window")[0];
const menuToggle = document.querySelector('#menu-toggle');
const menu = document.querySelector('.sidebar');
const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');
const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');
const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');
const editUsername = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');
const userAvatarElem = document.querySelector('.user-avatar');
const postsWrapper = document.querySelector('.posts');
const buttonNewPost = document.querySelector('.button-new-post');
const addPostElem = document.querySelector('.add-post');
const loginForget = document.querySelector('.login-forget')
const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;
const DEFAULT_PHOTO = userAvatarElem.src;

const setUsers = {
  user: null,
  initUser(handler) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
      if (handler) handler();
    })
  },
  logIn(email, password, handler) {
    if (!regExpValidEmail.test(email)) return alert ("Email не валиден");

    firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
      const errCode = err.code;
      const errMessage = err.message;
      if (errCode === 'auth/wrong-password') {
        console.log(errMessage)
        alert('Неверный пароль!')
      } else if (errCode === 'auth/user-not-found') {
        console.log(errMessage)
        alert('Пользователь не найден!')
      } else {
        alert(errMessage)
      }

      console.log(err)
    })
    // const user = this.getUser(email);
    // if (user && user.password === password) {
    //   this.authorizedUser(user);
    //   handler();
    // } else {
    //   alert('Пользователь с такими данными не найден');
    // }
  },
  logOut() {
    firebase.auth().signOut();
  },
  signUp(email, password, handler) {
    if (!regExpValidEmail.test(email)) return alert ("Email не валиден");
    if (!email.trim() || !password.trim()) {
      return alert ('Введите данные для входа');
    }
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        this.editUser(email.substring(0, email.indexOf('@')), null, handler)
      })
      .catch(err => {
        const errCode = err.code;
        const errMessage = err.message;
        if (errCode === 'auth/weak-password') {
          console.log(errMessage)
          alert('Слабый пароль!')
        } else if (errCode === 'auth/email-already-in-use') {
          console.log(errMessage)
          alert('Email уже используется!')
        } else {
          alert(errMessage)
        }

        console.log(err)
      });
    // if (!this.getUser(email)) {
    //   const user = {email, password, displayName: email.substring(0, email.indexOf('@'))};
    //   listUsers.push(user);
    //   this.authorizedUser(user);
    //   if (handler) {
    //     handler();
    //   };
    // } else {
    //   alert('Пользователь с таким email уже зарегестрирован');
    // }
  }, 
  editUser(displayName, photoURL, handler) {

    const user = firebase.auth().currentUser;

    if (displayName) {
      if (photoURL) {
        user.updateProfile({
          displayName,
          photoURL
        }).then(handler)
      } else {
        user.updateProfile({
          displayName
        }).then(handler)
      }
    }
  },
  // getUser(email) {
  //   return listUsers.find(item => item.email === email);
  // },
  // authorizedUser(user) {
  //   this.user = user;
  // }

  sendForget(email) {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert('Письмо отправлено!')
      })
      .catch(err => {
        console.log(err)
      })
  }
};

loginForget.addEventListener('click', e => {
  e.preventDefault()
  setUsers.sendForget(emailInput.value)
  emailInput.value = ''
})

const setPosts = {
  allPosts: [
    {
      title: 'Заголовок поста',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись емубукв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags: ['свежее', 'новое', 'горячее', 'моё', 'случайность'],
      author: {displayName: 'Alexander', photo: 'http://ic.pics.livejournal.com/yana_anders/35088646/816065/816065_original.jpg'},
      date: '13.09.21, 20:11:23',
      like: 45,
      comments: 12,
    }
  ],
  addPost(title, text, tags, handler) {
    const user = firebase.auth().currentUser;

    this.allPosts.unshift({
      id: `postID${(+new Date()).toString(16)}-${user.uid}`,
      title, 
      text, 
      tags: tags.split(',').map(item => item.trim()), 
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photoURL,
      },
      date: new Date().toLocaleString(), 
      like: 0,
      comments: 0,
    });
    firebase.database().ref('post').set(this.allPosts)
      .then(() => this.getPosts(handler))
  },
  getPosts(handler) {
    firebase.database().ref('post').on('value', snapshot => {
      this.allPosts = snapshot.val() || [];
      handler();
    })
  }
};

const showAddPost = () => {
  addPostElem.classList.add('visible');
  postsWrapper.classList.remove('visible');
};

const toggleAuthDom = () => {   // func for toggling authrization menu 
  const user = setUsers.user;
  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photoURL || DEFAULT_PHOTO;  // userAvatarElem.src = user.photo || userAvatarElem.src;
    buttonNewPost.classList.add('visible');
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    buttonNewPost.classList.remove('visible');
    addPostElem.classList.remove('visible');
    postsWrapper.classList.add('visible');
  }
};

const showAllPosts = () => {
  let postsHTML =  '';
  setPosts.allPosts.forEach(({ title, text, date, tags, like, comments, author }) => {   // we use { title, text, date, tags } instead of post cause poat is an object
    postsHTML += `
        <section class="post">
        <div class="post-body">
          <h2 class="post-title">${title}</h2>
          <p class="post-text">${text}</p>
          <div class="tags">
            ${tags.map(tag => `<a href="#${tag}" class="tag">#${tag}</a>`)}
          </div>
        </div>
        <div class="post-footer">
          <div class="post-buttons">
            <button class="post-button likes">
              <svg width="19" height="20" class="icon icon-like">
                <use xlink:href="img/icons.svg#like"></use>
              </svg>
              <span class="likes-counter">${like}</span>
            </button>
            <button class="post-button comments">
              <svg width="21" height="21" class="icon icon-comment">
                <use xlink:href="img/icons.svg#comment"></use>
              </svg>
              <span class="comments-counter">${comments}</span>
            </button>
            <button class="post-button save">
              <svg width="19" height="19" class="icon icon-save">
                <use xlink:href="img/icons.svg#save"></use>
              </svg>
            </button>
            <button class="post-button share">
              <svg width="17" height="19" class="icon icon-share">
                <use xlink:href="img/icons.svg#share"></use>
              </svg>
            </button>
          </div>
          <div class="post-author">
            <div class="author-about">
              <a href="#" class="author-username">${author.displayName}</a>
              <span class="post-time">${date}</span>
            </div>
            <a href="#" class="author-link"><img src=${author.photo || "img/avatar.jpeg"} alt="avatar" class="author-avatar"></a>
          </div>
        </div>
      </section>
    `;
  });
  postsWrapper.innerHTML = postsHTML;

  addPostElem.classList.remove('visible');
  postsWrapper.classList.add('visible');
};

const init = () => {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
    setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  });
  
  loginSignup.addEventListener('click', e => {   // event listener for form submit
    e.preventDefault();
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
    setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  });

  exitElem.addEventListener('click', e => {
    e.preventDefault();
    setUsers.logOut();
  });
  
  editElem.addEventListener('click', e => {
    e.preventDefault();
    editContainer.classList.toggle('visible');
    editUsername.value = setUsers.user.displayName;
  });
  
  editContainer.addEventListener('submit', e => {
    e.preventDefault();
    setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom);
    editContainer.classList.remove('visible');
  });

  menuToggle.addEventListener('click', e => {
    e.preventDefault();
    menu.classList.toggle('visible');
  });

  buttonNewPost.addEventListener('click', e => {
    e.preventDefault();
    showAddPost();
  });

  addPostElem.addEventListener('submit', e => {
    e.preventDefault();
    const { title, text, tags } = addPostElem.elements;
    
    if (title.value.length < 6) {
      alert('Заголовок не может быть короче 6 символов!');
      return;
    }
    if (text.value.length < 60) {
      alert('Сожержание не может быть короче 60 символов!');
      return;
    }

    setPosts.addPost(title.value, text.value, tags.value, showAllPosts);
    addPostElem.classList.remove('visible');
    addPostElem.reset();
  });

  setUsers.initUser(toggleAuthDom)
  setPosts.getPosts(showAllPosts);
};

document.addEventListener('DOMContentLoaded', init);