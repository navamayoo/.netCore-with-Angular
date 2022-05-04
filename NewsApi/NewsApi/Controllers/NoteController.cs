using Microsoft.AspNetCore.Mvc;
using NewsApi.Models;
using NewsApi.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NewsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private INoteRepository noteRepository;
        public NoteController(INoteRepository repository)
        {
            noteRepository = repository;
        }
        // GET: api/<NoteController>
        [HttpGet]
        public IEnumerable<Note> GetNote()
        {
            return noteRepository.GetAllNotes().ToList();
        }

        // GET api/<NoteController>/5
        [HttpGet("{id}")]
        public Note GetNoteById(int id)
        {
            return noteRepository.GetNoteById(id);
        }

        // POST api/<NoteController>
        [HttpPost]
        public Note Create([FromBody] Note note)
        {
            return noteRepository.CreateNote(note);
        }

        // PUT api/<NoteController>/5
        [HttpPut("{id}")]
        public Note Update(int id, [FromBody] Note note)
        {
            return noteRepository.UpdateNote(note, id);
        }

        // DELETE api/<NoteController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            noteRepository.DeleteNote(id);
        }
    }
}
