import {Router} from 'express';

const router = Router();

router.get('/aboutme', (req, res) => {
const aboutMe = {
  firstName: 'Jay',
  lastName: 'Bhesania',
  biography: 'I am a developer from New York City.\nI enjoy building web applications using JavaScript and Node.js.',
  favoriteMovies: ['The Godfather', 'The Dark Knight', 'The Shawshank Redemption'],
  hobbies: ['Playing video games', 'Watching movies', 'Traveling'],
  fondestMemory: 'Going on a road trip with my family to Niagara Falls.'
};
res.json(aboutMe);
});


router.get('/mystory', (req, res) => {
const myStory = {
  storyTitle: 'The Haunted Mansion',
  storyGenre: 'Horror',
  story: 'The sun was setting, casting an orange glow over the horizon as the lone traveler reached the summit of the mountain.\n'
};
res.json(myStory);
});


router.get('/educationhistory', (req, res) => {
const educationHistory = [
  {
    schoolName: 'Stevens Institute of Technology',
    degreeEarned: 'Master of Science',
    numberOfYearsAttended: 2,
    favoriteClasses: ['Computer Science', 'Mathematics', 'Physics'],
    favoriteSchoolMemory: 'Winning first place in a city-wide robotics competition.'
  },
  {
    schoolName: 'Parul University',
    degreeEarned: 'Bachelor of Science',
    numberOfYearsAttended: 4,
    favoriteClasses: ['Data Structures', 'Operating Systems', 'Algorithms'],       
    favoriteSchoolMemory: 'Graduating with honors and celebrating with my friends.'
  },
  {
    schoolName: 'Carmel Convent',
    degreeEarned: 'H.S. Diploma',
    numberOfYearsAttended: 2,
    favoriteClasses: ['Science', 'Mathematics', 'Physics'],
    favoriteSchoolMemory: 'Winning first place in a science hackathon.'
  }
];
res.json(educationHistory);
});


router.get('*',async(req,res)=>{
  res.status(404).json({error: 'Not found'});
})



export default router;