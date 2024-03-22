<template>
    <main class="flex justify-center h-screen">
      <div>
      <!-- using prop -->
      <AppNavBar :userStore="userStore" />
        <header class="w-full">
            <br></br>
          <section class="text-center">
            <!--img class="m-auto" src="@\assets\DanPersona.svg" /-->
            <h1 style="font-size: 24px; font-weight: bold; text-decoration: underline;">Frequently Asked Questions</h1>
          </section>
          <br></br>
          <br></br>
          <!--Navigation bar-->
            <ul class="flex flex-col gap-4 text-left mx-auto max-w-md"> 
              <!-- Dashboard link -->
              <li>
                  <!--span style="position: relative; top: 6px" class="material-icons">dashboard</span-->
                 <h2 class="Question">What is the answer to this Question?</h2>
                 <br></br>
                 <p1 class="Answer">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum mi quis turpis sodales, eu varius ex tempus. Ut arcu purus, sodales eget fermentum quis, finibus sed neque.</p1>
              </li>
              <br></br>
              <!--Login link - Link only shows is user is logged out-->
              <li>
                <!--span style="position: relative; top: 6px" class="material-icons">dashboard</span-->
               <h2 class="Question">What is the answer to this Question?</h2>
               <br></br>
               <p1 class="Answer">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum mi quis turpis sodales, eu varius ex tempus. Ut arcu purus, sodales eget fermentum quis, finibus sed neque.</p1>
            </li>
            <br></br>
              <!--Logout link - Link only shows is user is logged in-->
              <li>
                <!--span style="position: relative; top: 6px" class="material-icons">dashboard</span-->
               <h2 class="Question">What is the answer to this Question?</h2>
               <br></br>
               <p1 class="Answer">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum mi quis turpis sodales, eu varius ex tempus. Ut arcu purus, sodales eget fermentum quis, finibus sed neque.</p1>
            </li>
            <br></br>
              <!--Client Intake Form link - only shows if user is an editor-->
              <li>
                <!--span style="position: relative; top: 6px" class="material-icons">dashboard</span-->
               <h2 class="Question">What is the answer to this Question?</h2>
               <br></br>
               <p1 class="Answer">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum mi quis turpis sodales, eu varius ex tempus. Ut arcu purus, sodales eget fermentum quis, finibus sed neque.</p1>
            </li>
            <br></br>
              <!--Create Event link - only shows if user is an editor-->
              <li>
                <!--span style="position: relative; top: 6px" class="material-icons">dashboard</span-->
               <h2 class="Question">What is the answer to this Question?</h2>
               <br></br>
               <p1 class="Answer">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum mi quis turpis sodales, eu varius ex tempus. Ut arcu purus, sodales eget fermentum quis, finibus sed neque.</p1>
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

  <script>
import BottomBar from '../components/BottomBar.vue';
export default {
  components: {
    BottomBar
  },

    

  
}
</script>
<style scoped>
/* Add your CSS styles for the bottom bar component here */
.Question {

  text-align: left;
  font-weight: bold;
}
.Answer {

    text-align: left;

  }
/*.bullet-line::before {
    content: "\2022"; 
    margin-right: 0.5em; 
  } */
  
  


</style>


