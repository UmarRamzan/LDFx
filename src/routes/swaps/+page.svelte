<script>
	import { deleteSwap, getSwapRequests, getSwapMatch, getEmail, getCourseTitle } from "$lib/api/clientFunctions";
	import { onMount } from "svelte";
    import { user } from "../UserStore";
    import { goto } from "$app/navigation";
    import { fade } from "svelte/transition";

    let pending = false;
    let showMatchPending = false;

    let statusColors = {
        "Found": "#9798CF",
        "Pending": "#F1C29A",
        "Not Found": "#D98888",
    }

    let swapTableData = [];
    let swapMatchData = {};

    let showMatchModal = false;

    const fetchData = async () => {
        if ($user) {
            pending = true;
            let {success, data, error} = await getSwapRequests($user.id);
            if (error) {console.log(error)}
            else {
                //sort by date
                data.sort((a, b) => {
                    return new Date(b.date_created) - new Date(a.date_created);
                })
                swapTableData = data;
            }
            pending = false;
        }
    }

    onMount( async () => {
        await fetchData();
    })

    $: $user, fetchData();

    const handleDeleteSwap = async (swapID) => {
        swapTableData = swapTableData.filter((swap) => swap.swap_id != swapID);
        const { success, data, error } =  deleteSwap(swapID);
        
    }

    const showSwapMatch = async (swapID) => {
        showMatchPending = true;
        showMatchModal = true;

        let {success, data, error} = await getSwapMatch(swapID);
        if (error) {console.log(error)}
        else {swapMatchData = data[0]}

        let {success: success2, data: data2, error: error2} = await getEmail(swapMatchData.user_id_one);
        swapMatchData.email_one = data2[0].email;

        let {success: success3, data: data3, error: error3} = await getEmail(swapMatchData.user_id_two);
        swapMatchData.email_two = data3[0].email;

        // get course titles
        let {success: success4, data: data4, error: error4} = await getCourseTitle(swapMatchData.course_id_one);
        swapMatchData.course_title_one = data4[0].course_title;

        let {success: success5, data: data5, error: error5} = await getCourseTitle(swapMatchData.course_id_two);
        swapMatchData.course_title_two = data5[0].course_title;

        showMatchPending = false;
    }

</script>

<header>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</header>


{#if !$user}

<div id="login-error">
    <i class="bi bi-arrow-left-right" id="error-icon"></i>
    <h3>You must be logged in to view swaps</h3>  
</div>
    
{:else}

{#if showMatchModal}
{#if !showMatchPending}
<div class="custom-backdrop" on:click|self={()=>showMatchModal=false} transition:fade>
  <div class="custom-modal">
    <h2>Swap Found!</h2>
    <hr>

    <div class="container">
        <div class="row mb-4">
            <i class="bi bi-arrow-left-right"></i>
            <p>{swapMatchData.course_title_one} - {swapMatchData.course_title_two}</p>
        </div>
        <div class="row">
                <i class="bi bi-envelope"></i>
            {#if swapMatchData.user_id_one == $user.id}
                <p>{swapMatchData.email_two}</p>
            {:else}
                <p>{swapMatchData.email_one}</p>
            {/if}

        </div>
    </div>

  </div>
</div>
{:else}
<div class="custom-backdrop" on:click|self={()=>showMatchModal=false} transition:fade>
    <div class="custom-modal">

        <div class="spinner-border text-primary" role="status"></div>
  
    </div>
  </div>
{/if}
{/if}

<div class="container-md" id="content">
    
    
    <div class="row align-items-center">
        
        <div class="col">
        
            
            <h2>Swap Requests</h2>
        </div>
        <div class="col d-flex justify-content-end">
            <a href="/swaps/create" class="btn btn-outline-success" id="create-swap-button">
                Create Swap Request
            </a>
            
        </div>
        
    </div>

    <hr>

    <div class="row mt-5">
        <table class="table table-bordered" id="swap-table">
            <thead>
              <tr>
                <th scope="col">Have</th>
                <th scope="col">Want</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            
            {#if !pending}
            <tbody>
                {#each swapTableData as swap (swap.swap_id)}
                    <tr>
                        <td>
                            {#each swap.haveList as course (course.course_id)}
                                <p>{course.course_title}</p>
                            {/each}
                        </td>
                        <td>
                            {#each swap.wantList as course (course.course_id)}
                                <p>{course.course_title}</p>
                            {/each}
                        </td>
                        <td>
                            <div class="container">
                                <div class="row">
                                    <div class="col-8">
                                        {#if swap.status=="Found"}
                                        <div class="status m-auto" style="background-color: {statusColors[swap.status]}; cursor: pointer; color: #4D4DD0" on:click={showSwapMatch(swap.swap_id)}>{swap.status}</div>
                                        {:else}
                                        <div class="status m-auto" style="background-color: {statusColors[swap.status]}; color: #E67B21">{swap.status}</div>
                                        {/if}
                                    </div>
                                    <div class="col">
                                        <i class="bi bi-trash" id="remove-swap" on:click={()=>{handleDeleteSwap(swap.swap_id)}}></i>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                {/each}
            </tbody>
            {/if}
          </table>

            {#if pending}
                <div class="d-flex w-100 justify-content-center mt-5">
                    <div class="spinner-border text-success" role="status"></div>
                </div>
            {/if}

            

    </div>
    
</div>

{/if}



<style>

.custom-backdrop {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0,0,0,0.5);
    z-index: 1000;
  }

  .custom-modal {
    padding: 25px;
    border-radius: 10px;
    max-width: 500px;
    margin: 10% auto;;
    text-align: center;
    background: var(--secondary);
  }

    #login-error {
        width: 50%;
        padding: 50px;
        text-align: center;
        border: 1px solid rgba(0,0,0,0.5);
        box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    #create-swap-button {
        color: var(--button-primary);
        background-color: var(--button-background);
    }

    #create-swap-button:hover {
        background-color: var(--button-hover-primary);
    }

    #error-icon {
        font-size: 3rem;
        margin-right: 40px;
    }

    #content {
        max-width: 800px;
        margin: auto;
        margin-top: 40px;
        border: 0px solid #000000;
        border-radius: 40px;
        background-color: var(--primary);
        padding: 40px;
        box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.2);
    }

    h2 {
        color: var(--font-main);
    }

    th, td {
        padding: 20px;
    }

     #swap-table {
        text-align: center;
        border:  Solid rgba(0, 0, 0, 0.11);
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
        background-color: var(--quaternary);
     }

     #remove-swap
     {
        color: var(--quniary);
     }

     #create-swap-icon {
        width: 30px;
     }

     .status {
        padding: 10px;
        width: 100px;
        text-align: center;
        border: 1px solid rgb(0, 0, 0, 0.5);
        border-radius: 10px;
     }

     .bi {
        font-size: 2rem;
     }

     #remove-swap:hover {
        cursor: pointer;
        color: var(--septanry);
     }

     .btn-outline-success
     {
         color: #ffffff;
         border-radius: 20px;
         background-color: var(--septanry);
         font-family: 'Chau Philomene One';
         border: None;
     }
     .btn-outline-success:hover
     {
        background-color: var(--other-primary);
        color: var(--quinary);
        font-family: 'Chau Philomene One';
     }
     .fa-sync
     {
        font-size: 20px;
        padding-left: 10px;
     }
     .m-auto
     {
         border: None;
     }

</style>