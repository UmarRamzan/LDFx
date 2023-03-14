<script>
    import { emailLinkConfirmation } from "../api/signup/+server";
    import { onMount } from "svelte";

    onMount(emailLinkConfirmation);

</script>