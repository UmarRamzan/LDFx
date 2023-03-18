<script>
    import { Styles } from 'sveltestrap';
    import Signup from './Signup.svelte';
    import Login from './Login.svelte';
    import Sidebar from './Sidebar.svelte';

    import { supabase } from '$lib/supabaseClient';
    import { user } from '../../routes/UserStore';

    import {
        Collapse,
        Navbar,
        NavbarToggler,
        NavbarBrand,
        Nav,
        NavItem,
        NavLink,
        Dropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem
    } from 'sveltestrap';
    
    import { onMount } from 'svelte/internal';

    onMount(async ()=>{
      const { data, error } = await supabase.auth.getSession()
      if (data) {user.set(data.session)}
      console.log("Data", data)
    })

    let currentUser;
    user.subscribe((data) => {currentUser = data; currentUser = currentUser})
    console.log(currentUser)

    let isOpen = false;

    function handleUpdate(event) {
        isOpen = event.detail.isOpen;
    }

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        user.set(null);
    }
</script>

<Styles />

<Navbar color="light" light expand="md">
    <Sidebar />

    <NavbarBrand href="/">LDFx</NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
      <Nav class="ms-auto" navbar>
        {#if !currentUser}
        <NavItem>
            <Signup />
        </NavItem>
        <NavItem>
            <Login />
        </NavItem>
        {:else}
        <Dropdown nav inNavbar>
          <DropdownToggle nav caret>{currentUser.user.email}</DropdownToggle>
          <DropdownMenu end>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem divider />
            <DropdownItem on:click={handleLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/if}
      </Nav>
    </Collapse>
</Navbar>

