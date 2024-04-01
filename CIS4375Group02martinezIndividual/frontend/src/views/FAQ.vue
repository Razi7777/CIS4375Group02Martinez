<template>
  <main class="flex justify-center min-h-screen test">
    <div class="flex-grow">
      <!-- using prop -->
      <AppNavBar :userStore="userStore" />
      <header class="w-full">
        <br>
        <section class="text-center">
          <!--img class="m-auto" src="@\\assets\\DanPersona.svg" /-->
          <h1 style="font-size: 24px; font-weight: bold; text-decoration: underline;">Frequently Asked Questions</h1>
        </section>
        <br>
        <br>
        <!--Navigation bar-->
        <ul class="flex flex-col gap-4 text-left mx-auto max-w-md pb-20">
          <!-- Dashboard link -->
          <li>
            <!--span style="position: relative; top: 6px" class="material-icons">dashboard</span-->
            <h2 class="Question">What is the answer to this Question?</h2>
            <br>
            <p1 class="Answer">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum mi quis turpis sodales, eu varius ex tempus. Ut arcu purus, sodales eget fermentum quis, finibus sed neque.</p1>
          </li>
          <br>
          <!--Login link - Link only shows is user is logged out-->
          <li>
            <!--span style="position: relative; top: 6px" class="material-icons">dashboard</span-->
            <h2 class="Question">What is the answer to this Question?</h2>
            <br>
            <p1 class="Answer">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum mi quis turpis sodales, eu varius ex tempus. Ut arcu purus, sodales eget fermentum quis, finibus sed neque.</p1>
          </li>
          <br>
          <!--Logout link - Link only shows is user is logged in-->
          <li>
            <!--span style="position: relative; top: 6px" class="material-icons">dashboard</span-->
            <h2 class="Question">What is the answer to this Question?</h2>
            <br>
            <p1 class="Answer">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum mi quis turpis sodales, eu varius ex tempus. Ut arcu purus, sodales eget fermentum quis, finibus sed neque.</p1>
          </li>
          <br>
          <!--Client Intake Form link - only shows if user is an editor-->
          <li>
            <!--span style="position: relative; top: 6px" class="material-icons">dashboard</span-->
            <h2 class="Question">What is the answer to this Question?</h2>
            <br>
            <p1 class="Answer">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum mi quis turpis sodales, eu varius ex tempus. Ut arcu purus, sodales eget fermentum quis, finibus sed neque.</p1>
          </li>
          <br>
          <!--Create Event link - only shows if user is an editor-->
          <li>
            <!--span style="position: relative; top: 6px" class="material-icons">dashboard</span-->
            <h2 class="Question">What is the answer to this Question?</h2>
            <br>
            <p1 class="Answer">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum mi quis turpis sodales, eu varius ex tempus. Ut arcu purus, sodales eget fermentum quis, finibus sed neque.</p1>
          </li>
        </ul>
      </header>
    </div>
    
  </main>
  <div>
      <BottomBar />
    </div>
</template>

<script>



</script>

<style scoped>
/* Style adjustments for FAQ page */

/* General page styling */
main {
  background-color: #f4f4f4; /* light grey background for contrast */
}

/* Header styles */
header h1 {
  font-size: 2rem; /* 32px */
  color: #333; /* dark text for contrast */
  margin-bottom: 1rem;
}



/* FAQ Item styles */
.Question {
  color: #5f27cd; /* Assuming a purple color theme */
  font-size: 1.25rem; /* 20px */
  margin-bottom: 0.25rem;
}

.Answer {
  color: #576574; /* slightly lighter text for the answer */
  font-size: 1rem; /* 16px */
  line-height: 1.6; /* for better readability */
  display: block; /* ensures the answer is on a new line */
  margin-bottom: 1.5rem; /* space after the answer */
}

/* List styles */
ul {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 2rem;
  min-width: 15rem;
}

li {
  border-bottom: 1px solid #e0e0e0; /* light line between questions */
}

li:last-child {
  border-bottom: none; /* No border for the last item */
}

/* Spacing between list items */
li + li {
  margin-top: 2rem;
}

/* Bottom bar placeholder */

  /* Add your styles here */


.test {
  display: flex;
  justify-content: center;
  align-items: center;
  height:fit-content;
  padding: 1rem;
}
</style>
