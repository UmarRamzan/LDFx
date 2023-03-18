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
  const toggle = () => {
    open = !open;
    email = '';
    password = '';
    accountType = 'Student';
  };

	let email = '';
	let password = '';
	let accountType = '';

  let pending = false;
	let linkSent = false;
  let errorMessage = '';

	const handleSignup = async () => {

    pending = true;

		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				data: {
					accountType: accountType
				},
				emailRedirectTo: 'http://localhost:5173/emailVerified'
			}
		})

		if (error) {console.log(error); errorMessage = error}
		else {console.log(data); linkSent=true;}

        pending = false;
	}

    const resetError = (email, password, accountType) => {errorMessage = ''}
    $: resetError(email, password, accountType)

  </script>

<div>
    <Button color="outline-dark" on:click={toggle}>Sign-Up</Button>
    <Modal isOpen={open} {toggle}>
      <ModalHeader {toggle}>Sign-Up</ModalHeader>
      
        <Form on:submit={handleSignup}>
          <ModalBody>
            <FormGroup>
              <Input type="email" id="email" placeholder="Email" bind:value={email} required/>
            </FormGroup>
          
            <FormGroup>
              <Input type="password" id="password" placeholder="Password" bind:value={password} required/>
            </FormGroup>  

            <FormGroup>
              <Input type="select" bind:value={accountType}>
                <option>Student</option>
                <option>Alumnus</option>
              </Input>
            </FormGroup>

            {#if linkSent}
            <Alert color='success'>Email verification link has been sent</Alert>
            {/if}

            {#if errorMessage}
            <Alert color='danger'>{errorMessage}</Alert>
            {/if}

            
      </ModalBody>
      <ModalFooter>
        
      
      <Button color="outline-secondary" on:click={toggle}>Cancel</Button>
        {#if !pending}
            <Button color="outline-success" type="submit">Submit</Button>
        {:else}
            <Button color="outline-success"><Spinner color="success" type="border" size="sm" /></Button>
        {/if}
      </ModalFooter>
        </Form>
    </Modal>
  </div>

  