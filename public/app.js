const app = Vue.createApp({
  data() {
     return {
        currentForm: 'Login',
        forms: [
          {keyword: 'Login',         name: 'Вход'},
          {keyword: 'Registration',  name: 'Регистрация'},
          {keyword: 'Recovery',      name: 'Восстановление'}
         ]
     }
  },
  computed: {
    currentFormComponent() {
      return 'form-' + this.currentForm.toLowerCase()
    }
  },
  delimiters: ["${", "}$"]
})

app.component('form-login', {
  template: `
   <form class="form" action="/form1" method="post">

       <div class="form__group">
         <input class="form__control" type="text" placeholder="Имя аккаунта" name="email" required>
         <span class="form__line"></span>
       </div>

       <div class="form__group">
         <input class="form__control" type="password" placeholder="Пароль" name="password"required>
         <span class="form__line"></span>
       </div>

       <div class="form__footer">
           <button class="btn" type="submit">Войти</button>
           <a class="google" href="/google">
             <img src="google.svg" alt="">
           </a>
       </div>
       
  
   </form>`
})

app.component('form-registration', {
  template: `
   <form class="form" action="/form2" method="post">

       <div class="form__group">
         <input class="form__control" type="text" placeholder="Имя аккаунта" name="userName" reuqired>
         <span class="form__line"></span>
       </div>

       <div class="form__group">
         <input class="form__control" type="email" placeholder="E-mail" name="email"reuqired>
         <span class="form__line"></span>
       </div>

       <div class="form__group">
         <input class="form__control" type="password" placeholder="Пароль" name="password" reuqired>
         <span class="form__line"></span>
       </div>

       <div class="form__group">
         <input class="form__control" type="password" placeholder="Подтвердите пароль" name="confirmpassword"reuqired>
         <span class="form__line"></span>
       </div>

       <div class="form__footer">
           <button class="btn" type="submit">Создать аккаунт</button>
       </div>

   </form>`
})

app.component('form-recovery', {
  template: `
   <form class="form" action="/form3" method="post">

       <div class="form__group">
         <input class="form__control" type="email" placeholder="E-mail" name="email"reuqired>
         <span class="form__line"></span>
       </div>

       <div class="form__footer">
           <button class="btn" type="submit">Получить пароль</button>
       </div>

   </form>`
})

app.mount('#dynamic-forms')



const app2 = Vue.createApp({
 data() {
    return {
       currentProf: 'Profile',
       profs: [
         {keyword: 'Profile',     name: 'Профиль'},
         {keyword: 'Scoreboard',  name: 'Результаты'}
        ]
    }
 },
 computed: {
   currentProfComponent() {
     return 'prof-' + this.currentProf.toLowerCase()
   }
 },
 delimiters: ["${", "}$"]
})

app2.component('prof-profile', {
 template: `
   <form class="form" action="/" method="post">
     <div class="form__group">
       <input class="form__control" type="text" value="[nickname]" readonly>
       <span class="form__line"></span>
     </div>

     <div class="form__group">
       <input class="form__control" type="email" value="[e-mail]" readonly>
       <span class="form__line"></span>
     </div>

     <div class="form__group">
       <input class="form__control" type="password" placeholder="Новый пароль" required>
       <span class="form__line"></span>
     </div>

     <div class="form__group">
       <input class="form__control" type="password" placeholder="Подтвердите пароль" required>
       <span class="form__line"></span>
     </div>

     <div class="form__footer">
       <button class="btn" type="submit">Сохранить</button>
     </div>
   </form>`
})

app2.component('prof-scoreboard', {
 template: `
   <div class="form form--game">
     <div class="form__group game">
         <div class="form__gamename">[название игры]</div>
         <input class="form__control score" type="text" value="[score]" readonly>
         <span class="form__line"></span>
     </div>

     <div class="form__group game">
         <div class="form__gamename">[название игры]</div>
         <input class="form__control score" type="text" value="[score]" readonly>
         <span class="form__line"></span>
     </div>

     <div class="form__group game">
         <div class="form__gamename">[название игры]</div>
         <input class="form__control score" type="text" value="[score]" readonly>
         <span class="form__line"></span>
     </div>

     <div class="form__group game">
         <div class="form__gamename">[название игры]</div>
         <input class="form__control score" type="text" value="[score]" readonly>
         <span class="form__line"></span>
     </div>
   </div>`
})

app2.mount('#dynamic-profile')