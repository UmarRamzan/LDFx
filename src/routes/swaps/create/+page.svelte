<script>

  import { addSwapRequest, getCourses } from "$lib/api/clientFunctions";
	import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { user } from "../../UserStore";


  let haveList = [];
  let wantList = [];
  let courseList = [];
  let searchResults = [];

  let pending = false;

  onMount(async () => {
    const {success, data, error} = await getCourses()
    if (error) {console.log(error)}
    else {courseList = data}
  })

  const addHaveCourse = () => {
    haveList = [...haveList, {course_id: null, search_string: "", course_title: "", section: "", selected: false}]
  }

  const addWantCourse = () => {
    wantList = [...wantList, {course_id: null, search_string: "", course_title: "", section: "", selected: false}]
  }

  const removeHaveCourse = (course_idx) => {
    haveList = haveList.filter((course) => haveList.indexOf(course) != course_idx)
  }

  const removeWantCourse = (course_idx) => {
    wantList = wantList.filter((course) => wantList.indexOf(course) != course_idx)
  }

  const searchCourses = (searchString) => {

    if (searchString == '') {searchResults = []; return}

    searchString = searchString.toLowerCase();
    let searchArray = searchString.split(' ')

    searchResults = courseList;
    searchArray.forEach(searchString => {
      searchResults = searchResults.filter((course) => (course.subject_code.toLowerCase().includes(searchString) || course.catalog.toLowerCase().includes(searchString) || course.course_title.toLowerCase().includes(searchString) || course.instructor.toLowerCase().includes(searchString)))
    });
    
  }

  const submitRequest = async () => {
    pending = true
    const {success, data, error} = await addSwapRequest($user.id, haveList, wantList)
    if (error) {console.log(error)}
    else {goto('/swaps')}
    pending = false
  }

</script>

<div class="container-fluid mt-5">

  <div class="row m-auto mb-4">
    <div class="col d-flex justify-content-center align-items-center">
      <i class="bi bi-arrow-left-square mx-4" id="back-button" on:click={()=>{goto('/swaps')}}></i>
      <h2>Create Swap Request</h2>
    </div>
  </div>

  <div class="row justify-content-center">
    
    <div class="col-md-8 w-70" id="content">
      
      <div id="have-section">
        <div class="row mb-4">
          <div class="col">
              <h2>Have</h2>
          </div>

          <div class="col d-flex justify-content-end align-items-center">
              <button type="button" class="d-flex justify-content-center align-items-center btn btn-success" id="add-course-button" on:click={addHaveCourse}>
                <i class="bi bi-plus"></i>
              </button>
          </div>
      </div>
      
      <div class="row gy-4">
        {#each haveList as course (haveList.indexOf(course))}
        <div class="col-md-6">
          
          <div class="card px-4 pb-4">
            <div class="card-body">

              <div class="row justify-content-end">
                <button type="button" class="btn btn-outline-dark" id="remove-course-button" on:click={()=>removeHaveCourse(haveList.indexOf(course))}><i class="bi bi-x-lg"></i></button>
              </div>

              <div class="row dropdown w-100">
                <label for="courseSearch">Course</label>
                <input type="text" class="form-control" id="courseSearch" placeholder="Search for course title, code, instructor" bind:value={course.search_string} on:keyup={()=>{searchCourses(course.search_string)}} on:focus={()=>{course.selected = true; searchCourses(course.search_string)}} on:focusout={()=>{setTimeout(()=>{course.selected = false}, 50)}}>

                {#if course.selected}
                <ul class="list-group dropdown-content p-0">
                  {#each searchResults as searchResult (searchResults.indexOf(searchResult))}
                  <li class="list-group-item" on:click={()=>{
                    course.course_id = searchResult.course_id;
                    course.search_string = searchResult.course_title + ' (' + searchResult.Section + ')';
                    course.course_title = searchResult.course_title;
                    course.selected=false
                    }}>
                    {searchResult.course_title + ' (' + searchResult.Section + ')'}</li>
                  {/each}
                </ul>
                {/if}

              </div>
              
            </div>
          </div>
          
        </div>
        {/each}
      </div>
      
      </div>

      <div id="separator"></div>

      <div id="want-section">
        <div class="row mb-4">
          <div class="col">
              <h2>Want</h2>
          </div>

          <div class="col d-flex justify-content-end align-items-center">
              <button type="button" class="d-flex justify-content-center align-items-center btn btn-success" id="add-course-button" on:click={addWantCourse}>
                <i class="bi bi-plus"></i>
              </button>
          </div>
      </div>
      
      <div class="row gy-4">
        {#each wantList as course (wantList.indexOf(course))}
        <div class="col-md-6">
          
          <div class="card px-4 pb-4">
            <div class="card-body">

              <div class="row justify-content-end">
                <button type="button" class="btn btn-outline-dark" id="remove-course-button" on:click={()=>removeWantCourse(wantList.indexOf(course))}><i class="bi bi-x-lg"></i></button>
              </div>

              <div class="row dropdown w-100">
                <label for="courseSearch">Course</label>
                <input type="text" class="form-control" id="courseSearch" placeholder="Search for course title, code, instructor" bind:value={course.search_string} on:keyup={()=>{searchCourses(course.search_string)}} on:focus={()=>{course.selected = true; searchCourses(course.search_string)}} on:focusout={()=>{setTimeout(()=>{course.selected = false}, 50)}}>

                {#if course.selected}
                <ul class="list-group dropdown-content p-0">
                  {#each searchResults as searchResult (searchResults.indexOf(searchResult))}
                  <li class="list-group-item" on:click={()=>{
                    course.course_id = searchResult.course_id;
                    course.search_string = searchResult.course_title + ' (' + searchResult.Section + ')';
                    course.course_title = searchResult.course_title;
                    course.selected=false
                    }}>
                    {searchResult.course_title + ' (' + searchResult.Section + ')'}
                  </li>
                  {/each}
                </ul>
                {/if}

              </div>
              
            </div>
          </div>
          
        </div>
        {/each}
      </div>
      
      </div>

    </div>

    <!-- Submit button -->
    <div class="row mt-4 mb-4 justify-content-center align-items-center">
      {#if !pending}
      <button type="button" class="btn btn-success" id="add-course-button" on:click={submitRequest}>Create</button>
      {:else}
      <button type="button" class="btn btn-outline-success d-flex align-items-center justify-content-center" id="pending-course-button"><div class="spinner-border text-success" role="status"></div></button>
      {/if}
    </div>
  </div>
</div>

<style>

#content {
  border: 0px solid #000000;
  border-radius: 40px;
  background-color: var(--primary);
  padding: 40px;
  box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

#back-button {
  font-size: 2.5rem;
}

#back-button:hover {
  cursor: pointer;
}

.card {
  box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.1);
  background-color: var(--secondary);
  width: 100%;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  border: 1px solid #ddd;
  position: absolute;
  z-index: 1;
}

.dropdown-content:hover {
  cursor: pointer;
}

.dropdown ul{
   max-height:200px;
   overflow:auto;
}


  #add-course-button, #pending-course-button {
    width: 100px;
    height: 40px;
  }

  .bi-plus {
      font-size: 30px;
  }

  #separator {
      border-bottom: 1px solid #000000;
      margin-top: 40px;
      margin-bottom: 40px;
  }


  #remove-course-button {
      width: 40px;
      height: 40px;
      border: 0px;
  }

</style>