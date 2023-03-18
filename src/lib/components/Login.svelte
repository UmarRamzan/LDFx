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
    import { user } from "../../routes/UserStore"

    let open = false;
    const toggle = () => {
      open = !open;
      email = '';
      password = ''
      errorMessage = '';
    };

	  let email = '';
	  let password = '';

    let pending = false;
    let errorMessage = '';

    const handleLogin = async () => {

          pending = true;

          const { data, error } = await supabase.auth.signInWithPassword({
              email: email,
              password: password,
          })

          if (error) {console.log(error); errorMessage = error}
          else {
            user.set(data)
            open = false;
          }

          pending = false;
      }

    const resetError = (email, password) => {errorMessage = ''}
    $: resetError(email, password)

  </script>

<div>
    <Button color="outline-dark" on:click={toggle}>Login</Button>
    <Modal isOpen={open} {toggle}>
      <ModalHeader {toggle}>Login</ModalHeader>
      
        <Form on:submit={handleLogin}>
          <ModalBody>
            <FormGroup>
              <Input id="email" placeholder="Email" type="email" bind:value={email} required/>
            </FormGroup>
          
            <FormGroup>
              <Input id="password" placeholder="Password" type="password" bind:value={password} required/>
            </FormGroup>  

            {#if errorMessage}
            <Alert color='danger'>{errorMessage}</Alert>
            {/if}
          </ModalBody>
          <ModalFooter>
            <Button color="outline-secondary" on:click={toggle}>Cancel</Button>
            {#if !pending}
                <Button color="outline-success">Submit</Button>
            {:else}
                <Button color="outline-success"><Spinner color="success" type="border" size="sm" /></Button>
            {/if}
          </ModalFooter>
        </Form>
      
      
    </Modal>
  </div>

  