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
    const toggle = () => (open = !open);

	let email = '';
	let password = '';
	let accountType = '';

    let pending = false;
	let linkSent = false;
    let error = '';

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

		if (error) {console.log(error);}
		else {console.log(data); linkSent=true;}

        pending = false;
	}

    $: email, password && (()=>{error='';})

  </script>

<div>
    <Button color="outline-dark" on:click={toggle}>Sign-Up</Button>
    <Modal isOpen={open} {toggle}>
      <ModalHeader {toggle}>Sign-Up</ModalHeader>
      <ModalBody>
        <Form>
            <FormGroup floating label="Email">
              <Input placeholder="Email" type="email" bind:value={email}/>
            </FormGroup>
          
            <FormGroup floating label="Password">
              <Input placeholder="Password" type="password" bind:value={password}/>
            </FormGroup>  

            {#if linkSent}
            <Alert color='success'>Email verification link has been sent</Alert>
            {/if}

            {#if error}
            <Alert color='danger'>{error}</Alert>
            {/if}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="outline-secondary" on:click={toggle}>Cancel</Button>
        {#if !pending}
            <Button color="outline-success" on:click={handleSignup}>Submit</Button>
        {:else}
            <Button color="outline-success" on:click={handleSignup}><Spinner color="success" type="border" size="sm" /></Button>
        {/if}
      </ModalFooter>
    </Modal>
  </div>

  