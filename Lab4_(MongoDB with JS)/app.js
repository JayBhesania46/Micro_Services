/*

1. Create a band of your choice.
2. Log the newly created band. (Just that band, not all bands)
3. Create another band of your choice.
4. Query all bands, and log them all
5. Create the 3rd band of your choice.
6. Log the newly created 3rd band. (Just that band, not all bands)
7. Rename the first band
8. Log the first band with the updated name. 
9. Remove the second band you created.
10. Query all bands, and log them all
11. Try to create a band with bad input parameters to make sure it throws errors.
12. Try to remove a band that does not exist to make sure it throws errors.
13. Try to rename a band that does not exist to make sure it throws errors.
14. Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a band by ID that does not exist to make sure it throws errors.

*/

import {create,getAll,get,remove,rename} from "./data/bands.js";
import {dbConnection, closeConnection} from '../lab4_stub/config/mongoConnection.js';


async function main() 
{  
    const db = await dbConnection();
    db.dropDatabase();
    let pinkFloyd,Beatles,Linkin;
    
try
{
    pinkFloyd = await create("Pink Floyd", ["Progressive Rock", "Psychedelic rock", "Classic Rock"], "http://www.pinkfloyd.com", "EMI", ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett" ], 1965)
    console.log(pinkFloyd);
}
    catch (e) {
    console.log(e);
}
try
{
    Beatles = await create("The Beatles", ["Rock", "Pop", "Psychedelia"],"http://www.thebeatles.com","Parlophone",["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],1960);
} 
catch (e) 
{
    console.log(e);
}
try
{
   const cos=await getAll();
   console.log(cos);  
} 
catch (e) 
{
    console.log(e);
}
try
{
    Linkin = await create("Linkin Park",["Alternative Rock", "Pop Rock", "Alternative Metal"], "http://www.linkinpark.com","Warner", ["Chester Bennington", "Rob Bourdon", "Brad Delson", "Mike Shinoda", "Dave Farrell", "Joe Hahn"],1996);
   console.log(Linkin);  
} 
catch (e) 
{
    console.log(e);
}
try
{
    const show = await rename(pinkFloyd._id,"Pink")
    console.log(show);  
} 
catch (e) 
{
    console.log(e);
}
try
{
    const show = await remove(Beatles._id)
    console.log(show);  
} 
catch (e) 
{
    console.log(e);
}
try
{
    const cos=await getAll();
    console.log(cos);   
} 
catch (e) 
{
    console.log(e);
}
try
{
    const cos=await create("hello",1,"http://www.jaybhesaniya.com","xyz",["A","B"],1986)
    console.log(cos);   
} 
catch (e) 
{
    console.log(e);
}
try
{
    const show = await remove(Beatles._id)
    console.log(show);  
} 
catch (e) 
{
    console.log(e);
}
try
{
    const show = await rename(Beatles._id,"Jay")
    console.log(show);  
} 
catch (e) 
{
    console.log(e);
}
try
{
    const show = await rename(pinkFloyd._id,9)
    console.log(show);  
} 
catch (e) 
{
    console.log(e);
}
try
{
    const show = await get(Beatles._id)
    console.log(show);  
} 
catch (e) 
{
    console.log(e);
}
await closeConnection();
}

main();

