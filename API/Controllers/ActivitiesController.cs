using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _contex;

        public ActivitiesController(DataContext contex)
        {
            _contex = contex;
        }
        
        [HttpGet]
        public async Task <ActionResult<List<Activity>>> GetActivities()
        {
            return await _contex.Activities.ToListAsync();
        }
        //just one activity that want to fetch
        //we send id of specifital item thet we wont fetch and get respones
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity (Guid id)
        {
            return await _contex.Activities.FindAsync(id);
        }
    }
}
