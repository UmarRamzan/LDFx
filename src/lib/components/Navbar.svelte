<script>
    import { Styles } from 'sveltestrap';
    import Signup from './Signup.svelte';
    import Login from './Login.svelte';
    import Sidebar from './Sidebar.svelte';

    import { supabase } from '$lib/supabaseClient';

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

    let isOpen = false;

    function handleUpdate(event) {
        isOpen = event.detail.isOpen;
    }

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
    }
</script>

<Styles />

<Navbar color="light" light expand="md">
    <Sidebar />

    <NavbarBrand href="/">LDFx</NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
      <Nav class="ms-auto" navbar>
        <NavItem>
            <Signup />
        </NavItem>
        <NavItem>
            <Login />
        </NavItem>
        <Dropdown nav inNavbar>
          <DropdownToggle nav caret>Account</DropdownToggle>
          <DropdownMenu end>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem divider />
            <DropdownItem on:click={handleLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </Collapse>
</Navbar>