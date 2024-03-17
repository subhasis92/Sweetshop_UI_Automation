import {getDogBreedList} from "../../support/fetchDogBreedList"

describe("Create and verify dog breed list", () => {
  it("verify dog breeds count should match", async () => {
    let dogBreedList=await getDogBreedList();
    cy.fixture('expectedDogBreedList.json').then((expectedListSize)=>{
      expect(dogBreedList.length).to.equal(expectedListSize.breedCount)
    })
  });
});