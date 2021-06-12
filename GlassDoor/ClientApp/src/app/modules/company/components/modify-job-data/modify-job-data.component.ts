import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CareerLevel } from 'src/app/models/career-level';
import { City } from 'src/app/models/city';
import { Country } from 'src/app/models/country';
import { Currency } from 'src/app/models/currency';
import { EducationLevel } from 'src/app/models/education-level';
import { JobCategory } from 'src/app/models/job-category';
import { JobTypes } from 'src/app/models/job-types';
import { SalaryRate } from 'src/app/models/salary-rate';
import { Skills } from 'src/app/models/skills';
import { CareerLevelService } from 'src/app/shared/services/career-level.service';
import { CityService } from 'src/app/shared/services/city.service';
import { CountryService } from 'src/app/shared/services/country.service';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { EducationLevelService } from 'src/app/shared/services/education-level.service';
import { EnvironmentUrlService } from 'src/app/shared/services/environment-url.service';
import { JobCategoryService } from 'src/app/shared/services/job-category.service';
import { JobTypeService } from 'src/app/shared/services/job-type.service';
import { SalaryRateService } from 'src/app/shared/services/salary-rate.service';
import { SkillService } from 'src/app/shared/services/skill.service';
import { PostJobDto } from '../../models/post-job-dto';
import { EditJobService } from '../../services/edit-job.service';
import { PostJobService } from '../../services/post-job.service';

@Component({
  selector: 'app-modify-job-data',
  templateUrl: './modify-job-data.component.html',
  styleUrls: ['./modify-job-data.component.css']
})
export class ModifyJobDataComponent implements OnInit {
//intialization
  jobTypes: JobTypes[];
  countries: Country[];
  cities: City[];
  careerLevels: CareerLevel[];
  educationLevels: EducationLevel[];
  currencies: Currency[];
  salaryRates: SalaryRate[];
  jobCategories: JobCategory[];
  skills: Skills[];

  postJobDto: PostJobDto = {
    title: null,
    jobTypeId: null,
    cityId: null,
    countryId: null,
    numberOfVacancies: null,

    jobDetails: {
      experienceNeededMin: null,
      experienceNeededMax: null,
      careerLevelId: null,
      educationLevelId: null,
      salaryMin: null,
      salaryMax: null,
      salaryCurrencyId: null,
      salaryRateId: null,
      jobCategoryId: null,
      description: null,
      requirements: null,
      responsibilities: null,
    },
    skills: null
  }

  employeeform: FormGroup;
  public postjobform: FormGroup;
  constructor(private http: HttpClient,
    private _envUrl: EnvironmentUrlService,
    private _router: Router,
    private _JobTypeService: JobTypeService,
    private _countryService: CountryService,
    private _cityService: CityService,
    private _careerLevelService: CareerLevelService,
    private _educationLevelService: EducationLevelService,
    private _currencyService: CurrencyService,
    private _salaryRateService: SalaryRateService,
    private _jobCategoryService: JobCategoryService,
    private _skillService: SkillService,
    private _postJobService: PostJobService
    ) { }
    public results: Skills[];
  
  ngOnInit(): void {
    //display data
    this.postjobform = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'jobTypeId': new FormControl(null, [Validators.required]),
      'countryId': new FormControl(null, [Validators.required]),
      'cityId': new FormControl(null, [Validators.required]),
      'numberOfVacancies': new FormControl(null, [Validators.required]),
      'experienceNeededMin': new FormControl(null, [Validators.required]),
      'experienceNeededMax': new FormControl(null, [Validators.required]),
      'careerLevelId': new FormControl(null, [Validators.required]),
      'educationLevelId': new FormControl(null, [Validators.required]),
      'salaryMin': new FormControl(null),
      'salaryMax': new FormControl(null),
      'salaryCurrencyId': new FormControl(null, [Validators.required]),
      'salaryRateId': new FormControl(null, [Validators.required]),
      'jobCategoryId': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'requirements': new FormControl(null, [Validators.required]),
      'responsibilities': new FormControl(null, [Validators.required]),
      'skills': new FormControl(null, [Validators.required])
  });
  
  this._JobTypeService.getCompanyTypes().subscribe(jt => { this.jobTypes = jt });
  this._countryService.getCountries().subscribe(c => { this.countries = c });
  this._cityService.getCities().subscribe(c => { this.cities = c });
  this._careerLevelService.getCareerLevels().subscribe(c => { this.careerLevels = c });
  this._educationLevelService.getEducationLevels().subscribe(e => { this.educationLevels = e });
  this._currencyService.getCurrencies().subscribe(c => { this.currencies = c });
  this._salaryRateService.getSalaryRates().subscribe(s => { this.salaryRates = s });
  this._jobCategoryService.getjobCategories().subscribe(jc => { this.jobCategories = jc });
  this._skillService.getSkills().subscribe(s => { this.skills = s });
}
search(event) {
  this.results = this.skills.filter(c => c.name.startsWith(event.query));
}
public postjob(postjobform) {
  this.postJobDto.title = postjobform.value.title;
  this.postJobDto.cityId = postjobform.value.cityId;
  this.postJobDto.jobTypeId = postjobform.value.jobTypeId;
  this.postJobDto.countryId = postjobform.value.countryId;
  this.postJobDto.numberOfVacancies = postjobform.value.numberOfVacancies;
  this.postJobDto.jobDetails.experienceNeededMin = postjobform.value.experienceNeededMin;
  this.postJobDto.jobDetails.experienceNeededMax = postjobform.value.experienceNeededMax;
  this.postJobDto.jobDetails.careerLevelId = postjobform.value.careerLevelId;
  this.postJobDto.jobDetails.educationLevelId = postjobform.value.educationLevelId;
  this.postJobDto.jobDetails.salaryMin = postjobform.value.salaryMin;
  this.postJobDto.jobDetails.salaryMax = postjobform.value.salaryMax;
  this.postJobDto.jobDetails.salaryCurrencyId = postjobform.value.salaryCurrencyId;
  this.postJobDto.jobDetails.salaryRateId = postjobform.value.salaryRateId;
  this.postJobDto.jobDetails.jobCategoryId = postjobform.value.jobCategoryId;
  this.postJobDto.jobDetails.description = postjobform.value.description;
  this.postJobDto.jobDetails.requirements = postjobform.value.requirements;
  this.postJobDto.jobDetails.responsibilities = postjobform.value.responsibilities;
  this.postJobDto.skills = postjobform.value.skills.map((val, index) => ({ SkillsId: val.id }));
//other service
  this._postJobService.getalljobs(this.postJobDto).subscribe(a => {
    this._router.navigate(['/company/']);
  })
}
  }
