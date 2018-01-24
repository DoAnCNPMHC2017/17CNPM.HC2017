using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CayGiaPha.Controllers
{
    public class CGPController : Controller
    {
        // GET: CGP
        public ActionResult Index()
        {
            return View();
        }

        // GET: CGP
        public ActionResult CreateCGP()
        {
            return View();
        }
    }
}