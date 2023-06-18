import { Injectable } from "@angular/core";
import { Experience, isExperience } from "./@interfaces/experience.interface";
import { Skill, isSkill } from "./@interfaces/skill.interface";

@Injectable()
export class AppService {

    public getSkillsData() : Promise<Skill[]>{

        return fetch('assets/data/skills.json')
        .then(response => {
            if(response.status === 200){
                return response.json();
            }else{
                console.error("Skills data not found", response);
                return [];
            }
        })
        .then((skills: Skill[]) => {
            // Check data format
            if(skills.every((el) => isSkill(el))){
                return skills;
            }else{
                console.error("Wrong data format")
                return [];
            }
        });
    }

    public getFormationsData() : Promise<Experience[]>{

        return fetch('assets/data/formations.json')
        .then(response => {
            if(response.status === 200){
                return response.json();
            }else{
                console.error("Formations data not found", response);
                return [];
            }
        })
        .then((formations: Experience[]) => {
            // Check data format
            if(formations.every((el) => isExperience(el))){
                return formations;
            }else{
                console.error("Wrong data format")
                return [];
            }
        });
    }
}