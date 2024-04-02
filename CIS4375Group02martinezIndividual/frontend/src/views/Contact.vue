<template>
    <main class="flex justify-center h-screen">
      <div>
      <!-- using prop -->
      
        <header class="w-full">
            <br></br>
          <section class="text-center">
            <!--img class="m-auto" src="@\assets\DanPersona.svg" /-->
            <h1 style="font-size: 24px; font-weight: bold; text-decoration: underline;">Contact Us</h1>
          </section>
          <br></br>
          <br></br>
          <!--Navigation bar-->
            <ul class="flex flex-col gap-4 text-left mx-auto max-w-md"> 
              <!-- Dashboard link -->
              <li>
                  <!--span style="position: relative; inset-block-start: 6px" class="material-icons">dashboard</span-->
                 <h2 style="font-size: 24px; font-weight: bold; text-decoration: underline;">Call Us:</h2>
                 <br></br>
                 <p1 class="Answer"><strong>Phone Number:</strong> (123)-456-7891</p1>
              </li>
              <br></br>
              <!--Login link - Link only shows is user is logged out-->
              <li>
                <!--span style="position: relative; inset-block-start: 6px" class="material-icons">dashboard</span-->
               <h2 style="font-size: 24px; font-weight: bold; text-decoration: underline;">Email us:</h2>
               <br></br>
               <p1 class="Answer"><strong>Email:</strong> mybusinessemail@gmail.com</p1>
            </li>
            <br></br>
              <!--Logout link - Link only shows is user is logged in-->
              <li>
                <!--span style="position: relative; inset-block-start: 6px" class="material-icons">dashboard</span-->
               <h2 style="font-size: 24px; font-weight: bold; text-decoration: underline;">Follow us:</h2>
               <br></br>
               <p1 class="Answer"><strong>Instagram:</strong> <a href="https://www.instagram.com/trendifindz/">https://www.instagram.com/trendifindz/</a></p1>
               <br></br>
               <br></br>
               <p2 class="Answer"><strong>Facebook:</strong> <a href="https://www.facebook.com/">https://www.facebook.com/</a></p2>

            </li>
            <br></br>
            </ul>
        </header>
      </div>
      <div>
        <BottomBar />
      </div>
    </main>
  </template>

<style scoped>
/* Add your CSS styles for the bottom bar component here */
.Question {

  text-align: start;
  font-weight: bold;
}
.Answer {

    text-align: start;

  }
/*.bullet-line::before {
    content: "\2022"; 
    margin-inline-end: 0.5em; 
  } */
  
  


</style>
