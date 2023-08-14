let Form = document.getElementById("text-form");
let input = document.getElementById("text-input");
let results = document.getElementById("results");

if (Form) {
    Form.addEventListener("submit", function (event) {
    
    const TextError = document.getElementById("error");
    event.preventDefault();
    const inputValue = input.value.toLowerCase();
    
    if (inputValue) {
    if (TextError) TextError.remove();

   
    const letters = inputValue.replace(/[^a-zA-Z]/g, "").length;
    const nonletters = inputValue.replace(/[a-zA-Z]/g, "").length;
//Reference = https://stackoverflow.com/questions/20864893/replace-all-non-alphanumeric-characters-new-lines-and-multiple-white-space-wit    
    const textWords = inputValue.replace(/[^a-zA-Z\t\s]/g, "").trim().split(/\s+/);
    const wordslength = textWords.length;
    const UniqueWords = new Set(textWords);
    const uniquewordslength = UniqueWords.size;

    let vowels = 0;
    let consonants = 0;
      
    if (/[aeiou]/g.test(inputValue))
        vowels = inputValue.match(/[aeiou]/g);
        
    if (/[bcdfghjklmnpqrstvwxyz]/g.test(inputValue))
        consonants = inputValue.match(/[bcdfghjklmnpqrstvwxyz]/g);
        
    let longwords = textWords.filter((word) => word.length >= 6);
    let shortwords = textWords.filter((word) => word.length <= 3);
    let TextAnalysis = document.createElement("dl");
        TextAnalysis.innerHTML = `

            <dt>Original Input:</dt>
            <dd>${input.value}</dd>

            <dt>Total Letters:</dt>
            <dd>${letters}</dd>
            
            <dt>Total Non-Letters:</dt>
            <dd>${nonletters}</dd>
            
            <dt>Total Vowels:</dt>
            <dd>${vowels.length}</dd>
            
            <dt>Total Consonants:</dt>
            <dd>${consonants.length}</dd>
            
            <dt>Total Words:</dt>
            <dd>${wordslength}</dd>
            
            <dt>Unique Words:</dt>
            <dd>${uniquewordslength}</dd>
            
            <dt>Long Words:</dt>
            <dd>${longwords.length}</dd>
            
            <dt>ShortWords:</dt>
            <dd>${shortwords.length}</dd>`;

      results.hidden = false;
      results.append(TextAnalysis);
    } else {
      window.alert("Enter Valid Input To Analyze Your Text");

      if (!TextError) {
        let error = document.createElement("p");
        error.innerHTML ="Enter Text"
        error.setAttribute("id", "error");
        results.prepend(error);
      }
    }
  });
}