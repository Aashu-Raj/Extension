// Function to print the web page
async function printWebPage(websiteUrl, orientation, format) {
 
    const newWindow = await window.open(websiteUrl);
  
    // Wait for the new window to load, then print it
    // html2pdf().set(opt).from(newWindow).save();
    document.addEventListener('DOMContentLoaded', newWindow.addEventListener("load",()=>{
      newWindow.print()
    }))
    
    
  }
  
  
  
  document.addEventListener('DOMContentLoaded', function() {
      const submitButton = document.getElementById('submitBtn');
    
      submitButton.addEventListener('click', async function(event) {
        event.preventDefault(); 
        const websiteUrl = await document.getElementById('website-url').value;
        const orientation = document.querySelector('input[name="orientation"]:checked').value;
        const format = document.querySelector('input[name="format"]:checked').value;
    
        // Print the web page
        printWebPage(websiteUrl, orientation, format);
      });
  
      // if(submitButton){
      //   submitButton.addEventListener("click", printWebPage(websiteUrl, orientation, format))
      // }else{
      //   console.log("button not found")
      // }
    });
    
  
  
  
  