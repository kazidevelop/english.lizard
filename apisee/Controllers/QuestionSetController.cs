using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using apisee.Models;

namespace apisee.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionSetController : ControllerBase
    {
        private readonly ChiggyContext _context;

        public QuestionSetController(ChiggyContext context)
        {
            _context = context;
        }

        // GET: api/QuestionSet
        [HttpGet]
        public IEnumerable<Tblsets> GetTblsets()
        {
            var sets = _context.Tblsets
                .Include(b => b.Tblquestions)
                .ToList();
            return sets;
        }

        // GET: api/QuestionSet/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTblsets([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tblsets = await _context.Tblsets.FindAsync(id);

            if (tblsets == null)
            {
                return NotFound();
            }

            return Ok(tblsets);
        }

        // PUT: api/QuestionSet/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblsets([FromRoute] int id, [FromBody] Tblsets tblsets)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblsets.SetId)
            {
                return BadRequest();
            }

            _context.Entry(tblsets).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblsetsExists(id))
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

        // POST: api/QuestionSet
        [HttpPost]
        public async Task<IActionResult> PostTblsets([FromBody] Tblsets tblsets)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Tblsets.Add(tblsets);
            await _context.SaveChangesAsync();
            return null;
            // return CreatedAtAction("GetTblsets", new { id = tblsets.SetId }, tblsets);
        }

        // DELETE: api/QuestionSet/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblsets([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tblsets = await _context.Tblsets.FindAsync(id);
            if (tblsets == null)
            {
                return NotFound();
            }

            _context.Tblsets.Remove(tblsets);
            await _context.SaveChangesAsync();

            return Ok(tblsets);
        }

        private bool TblsetsExists(int id)
        {
            return _context.Tblsets.Any(e => e.SetId == id);
        }
    }
}