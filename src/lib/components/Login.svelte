<script lang="ts">

    import {
      Button,
      Modal,
      ModalBody,
      ModalFooter,
      ModalHeader,
      Badge,
      Form,
      FormGroup, 
      Input, 
      Label,
      Alert,
      Spinner
    } from 'sveltestrap';

    import { supabase } from "$lib/supabaseClient";

    let open = false;
    const toggle = () => {open=!open; email=''; password=''};

	let email = '';
	let password = '';

    let pending = '';
    let errorMessage = '';

	const handleLogin = async () => {

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) {console.log(error); errorMessage = error}
        else {console.log(data); open=false}
    }

    const resetError = (email, password) => {errorMessage = ''}
    $: resetError(email, password)

  </script>

<div>
    <Button color="outline-dark" on:click={toggle}>Login</Button>
    <Modal isOpen={open} {toggle}>
      <ModalHeader {toggle}>Login</ModalHeader>
      <ModalBody>
        <Form>
            <FormGroup floating label="Email">
              <Input placeholder="Email" type="email" bind:value={email}/>
            </FormGroup>
          
            <FormGroup floating label="Password">
              <Input placeholder="Password" type="password" bind:value={password}/>
            </FormGroup>  

            {#if errorMessage}
            <Alert color='danger'>{errorMessage}</Alert>
            {/if}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="outline-secondary" on:click={toggle}>Cancel</Button>
        {#if !pending}
            <Button color="outline-success" on:click={handleLogin}>Submit</Button>
        {:else}
            <Button color="outline-success"><Spinner color="success" type="border" size="sm" /></Button>
        {/if}
      </ModalFooter>
    </Modal>
  </div>

  