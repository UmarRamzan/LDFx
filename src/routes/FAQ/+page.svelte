<script>
// @ts-nocheck

	let accordionItems = [
	  { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et? ', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
	  { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et? ', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
	  { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et? ', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
	  { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et? ', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
	  { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et? ', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
	];
	function toggleAccordion(index) {
	  accordionItems = accordionItems.map((item, i) => {
		if (i === index) {
		  return {
			...item,
			isOpen: !item.isOpen
		  };
		}
		return {
		  ...item,
		  isOpen: false
		};
	  });
	}
</script>

<main>
<body>
		<div>
			<div class = 'mm'>
				<h1 id='faq'>Frequently Asked Questions</h1>
				<hr class="class-1" />
				<hr class="class-2" />
			</div>
			<div class="accordion">
				{#each accordionItems as item, i}
				<div class="accordion-item" class:open={item.isOpen} on:click={() => toggleAccordion(i)}>
					<div class="accordion-header">
                        <span>{item.title}</span>
                        <img src = "src/routes/FAQ/faqimg.png" alt = "Question Mark" class = "qs-1">
                        <i class="material-icons">{item.isOpen ? '⌃' : '⌄'}</i>
					</div>
					<div class="accordion-content">
					    {item.content}
					</div>
				</div>
				{/each}
	
			</div>
		</div>
	<div id = "footer">
		<h3 id = "rev">Reviews</h3>
		<img src="src/routes/FAQ/logoLDF.png" alt = "Logo" class = "responsive">
	</div>
</body>
</main>
  
<style>
	@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;1,300&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Chau+Philomene+One:ital@0;1&display=swap');

	#faq
	{
		font-family: 'Chau Philomene One';
		font-size: 45px;
		text-align: center;
		padding-top: 2.95%;
		margin-bottom: -10px;
		position: relative;
		color: #1B2E35;
        padding-right: -8%;
	}
	.class-1
	{
		border-top: 4px solid #fff;
		width: 200px;
		margin-left: 670px;
		margin-right: 750px;
		width: 20%;
		margin-bottom: -12.5px;
		position: absolute;
	}
	.class-2
	{
		border-top: 4px solid #4D4DCF;
		padding-left: 55px;
		margin-left: 780px;
		margin-right: 750px;
		padding-right: 5%;
		width: 8%;
		position: relative;
	}
	.mm
	{
		position: fixed;
	}  

	.accordion {
	  max-width: 85%;
	  padding-left: 15%;
	  padding-top: 11%;
	  position: fixed;
	}
	body
	{
		background-color: #FFE5D5;
		display: block;
		overflow: auto;
		height: 100%; 
		width: 100%; 
		min-height: 100vh;
		margin: 0%;
   		box-sizing: border-box;
		overflow: auto;
		padding: 0%;
		background-size: cover;
	} 
  
	.accordion-item {
	  border-bottom: 2px solid #DEDAC4;
	  border-radius: 0%;
	  margin-bottom: 0%;
      border-left: 2px solid #FFE5D5;
      border-right: 2px solid #FFE5D5;
      border-top: 2px solid #FFE5D5;

	}
    main
    {
        background-color: #2b2b2b;
    }
  
	.accordion-item.open .accordion-content {
	  max-height:  100%;
	  transition: max-height 0.01s;
	  font-family: 'Chakra Petch';
	  padding-bottom: 2%;
	  font-size: 19px;
	  color: #1B2E35;
      background-color: #FFE5D5;
      padding-left: 5%;
	}
  
	.accordion-header {
	  display: flex;
	  justify-content: space-between;
	  cursor: pointer;
	  user-select: none;
	  font-family: 'Chau Philomene One';
	  font-size: 25px;
	  padding-top: 0.95%;
	  padding-bottom: 0.95%;
	  color: #1B2E35;
      background-color: #FFE5D5;
      border-left: 1px solid #FFE5D5;
      padding-left: 5%;
	}
  
	.accordion-content {
	  max-height: 0;
	  overflow: hidden;
	  transition: max-height 0.01s;
      background-color: #FFE5D5; 
	}
	.material-icons
	{
		padding-left: 10%;
	}
	#footer 
	{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 8%;
        background: #FEC5BB;
    }
	#rev
	{
		float: right;
		padding-top: 1.05%;
		padding-bottom: 5%;
		padding-right: 10%;
		font-family: 'Chau Philomene One';
		font-size: 25px;
		margin-bottom: 50%;
	}
	.responsive
	{
		width: 10%;
		height: 68%;
		padding-top: 1.05%;
		padding-left: 3%;
	}
	.qs-1
	{
        width: 4%;
        height: 30%;
        transform: translate(-2240%, 40%);
    }
</style>