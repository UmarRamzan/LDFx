<script lang="ts">
// @ts-nocheck
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
    import { logIn } from '$lib/api/csFunctions';

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
          let res = await logIn(email, password);
          if (res.error) {
            errorMessage = res.error;
          } else {
            console.log(res.data)
            console.log(res.data.user.user_metadata)
            user.set(res.data)
            toggle()
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

  