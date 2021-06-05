﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DAL;
using DAL.Models;
using GlassDoor.ViewModels;
using AutoMapper;
using glassDoor.ViewModels;
using DAL.Constants;

namespace glassDoor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
      //  private readonly ApplicationDbContext _context;

        public JobsController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
           // _userManager = userManager;
        }

        // GET: api/Jobs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Job>>> GetJobs()
        {
            var allJobData =  _unitOfWork.Jobs.GetAllJobData();
            return Ok( _mapper.Map<IEnumerable<JobViewModel>>(allJobData));
        }

        // GET: api/Jobs/GetJobDetails/5
        

        // GET: api/Jobs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Job>> GetJob(int id)
        {
            var job =  _unitOfWork.Jobs.Find(a=>a.Id == id).FirstOrDefault();
           

            if (job == null)
            {
                return NotFound();
            }

            return job;
        }
        

        [HttpGet("Search/{term}/{loc}")]
        public async Task <ActionResult<IEnumerable< Job>>> Search(string term, string loc)
        {

            var res = _unitOfWork.Jobs.GetAllJobData().Where(i => i.Title.Contains(term, StringComparison.InvariantCultureIgnoreCase)
                || i.Company.Name.Contains(term,StringComparison.InvariantCultureIgnoreCase )
                || i.Country.Name.Contains(loc, StringComparison.InvariantCultureIgnoreCase)
                || i.City.Name.Contains(loc, StringComparison.InvariantCultureIgnoreCase)).ToList();
            return res;

           // var result = _unitOfWork.Jobs.GetAllJobData().Where(j => j.Title.Contains(term.NoMatterLowerOrUpper())
          
            
            
           // return  result ;
      
        }

        /*

        // PUT: api/Jobs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJob(int id, Job job)
        {
            if (id != job.Id)
            {
                return BadRequest();
            }

            _context.Entry(job).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Jobs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Job>> PostJob(Job job)
        {
            _context.Jobs.Add(job);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJob", new { id = job.Id }, job);
        }

        // DELETE: api/Jobs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJob(int id)
        {
            var job = await _context.Jobs.FindAsync(id);
            if (job == null)
            {
                return NotFound();
            }

            _context.Jobs.Remove(job);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JobExists(int id)
        {
            return _context.Jobs.Any(e => e.Id == id);
        }*/
    }

}
