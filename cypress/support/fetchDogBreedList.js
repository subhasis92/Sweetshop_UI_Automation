export const getBreedList= async() =>{
    const breedListurl="https://dog.ceo/api/breeds/list/all";
    const response= await fetch(breedListurl, {
        method: "GET"
    });
    const body= await response.json();
    const allBreedList=Object.keys(body?.message);
    return allBreedList;
}

export const getDogBreedList = async() => getBreedList();
