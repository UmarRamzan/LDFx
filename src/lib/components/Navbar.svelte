<script>

    // @ts-nocheck

    import Signup from './Signup.svelte';
    import Login from './Login.svelte';

    import { getUserData } from '$lib/api/clientFunctions';
    import { logout } from '$lib/api/clientFunctions';

    import { onMount } from 'svelte';

    let currentUser;
    onMount( async () => {
      const user = await getUserData();
      if (user) { currentUser = user }
    })

    const handleLogout = async () => {await logout(); currentUser = null}
</script>


<!-- Sidebar -->
<div class="offcanvas offcanvas-start" tabindex="-1" id="sidebar" aria-labelledby="staticBackdropLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="staticBackdropLabel"></h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div id="sidebar-links" data-bs-toggle="offcanvas">
      <ul class="list-group list-group-flush" >
        <li class="list-group-item"><a href="/swaps" >Swaps</a></li>
        <li class="list-group-item"><a href="/reviews">Reviews</a></li>
        <li class="list-group-item"><a href="/donations">Donations</a></li>
        <li class="list-group-item"><a href="/jobs">Jobs</a></li>
        <li class="list-group-item"><a href="/howWeWork">How We Work</a></li>
        <li class="list-group-item"><a href="/about">About Us</a></li>
      </ul>
    </div>
  </div>
</div>

<nav class="navbar sticky-top navbar-expand-lg navbar-light" id="navbar">
  <div class="container-fluid">

    <div class="row g-2 justify-content-start align-items-center">
      <!-- Sidebar button -->
      <div class="col">
        <i class="bi bi-list" id="sidebar-icon" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="staticBackdrop" ></i>
      </div>
      <div class="col">
        <a class="navbar-brand" href="/">LDFx</a>
      </div>
    </div>

    <div class="row justify-content-center">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      {#if currentUser}
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {currentUser.email}
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="/settings">Settings</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><button class="dropdown-item" on:click={handleLogout}>Logout</button></li>
          </ul>
        </li>
      </ul>
      {:else}
      <form class="d-flex">
        <!-- Signup modal trigger -->
        <div class="col">
          <button type="button" class="btn btn-outline-dark" id="signup-button" data-bs-toggle="modal" data-bs-target="#signup-modal">
              Signup
          </button>
        </div>
        <!-- Login modal trigger -->
        <div class="col">
          <button type="button" class="btn btn-outline-dark" id="login-button" data-bs-toggle="modal" data-bs-target="#login-modal">
              Login
          </button>
        </div>
      </form>
      {/if}
    </div>
    </div>
  </div>
</nav>

<Signup />
<Login />

<style>
  #sidebar-icon {
    font-size: 2rem;
    cursor: pointer;
  }
  #sidebar, #navbar, li, .dropdown-menu{
    background-color: var(--primary);
    border-color: black;
    color: black;
  }

  #navbar {
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  }

  .dropdown-item:hover {
    background-color: var(--secondary);
  }

  #signup-button {
    margin-right: 10px;
  }

  #signup-button:hover {
    background-color: var(--secondary);
    color: black;
  }

  #login-button {
    margin-right: 10px;
  }

  #login-button:hover {
    background-color: var(--secondary);
    color: black;
  }

  a {
    text-decoration: none;
    color: black;
  }

  a:hover {
    color: var(--quinary);
  }

  #sidebar-links {
    background-color: var(--primary);
  }
</style>