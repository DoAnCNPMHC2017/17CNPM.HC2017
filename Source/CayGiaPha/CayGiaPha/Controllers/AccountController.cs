using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CayGiaPha.Helper;
namespace CayGiaPha.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Login()
        {
            if (CurrentContext.IsLogged() == true)
            {
                return RedirectToAction("Index", "Home");
            }
            Account model = new Account();
            model.Username = "";
            return View(model);
        }
        [HttpPost]
        public ActionResult Login(Account model)
        {
            using (CGPEntities dt = new CGPEntities())
            {
                //string pass = StringUtils.MD5(model.PassWord);
                Account us = dt.Accounts
                    .Where(p => p.Username == model.Username && p.Password == model.Password)
                    .FirstOrDefault();
                if (us != null)
                {
                    //if (model.Remember != null)
                    //{
                    //    //Cái này xử lí nếu người dùng check Ghi nhớ đăng nhập
                    //    Response.Cookies["userID"].Value = us.UserName.ToString();
                    //    Response.Cookies["userID"].Expires = DateTime.Now.AddDays(7);
                    //}
                    Session["isLogin"] = 1;
                    Session["user"] = us;
                    Session["username"] = us.Username;

                    //Response.Write("<script LANGUAGE='JavaScript' >alert('Đăng nhập thành công.')</script>");
                    return RedirectToAction("Index", "Home");
                }
                //Response.Write("<script LANGUAGE='JavaScript' >alert('Tên đăng nhập hoặc mật khẩu không đúng')</script>");
                return View(model);
            }
        }
        public ActionResult Logout()
        {
            CurrentContext.Destroy();
            return RedirectToAction("Index", "Home");
        }
        public ActionResult Register()
        {
            if (CurrentContext.IsLogged() == true)
            {
                return RedirectToAction("Index", "Home");
            }
            return View();
        }
        [HttpPost]
        public ActionResult Register(Account model)
        {
            using (CGPEntities ctx = new CGPEntities())
            {
                // Check exists Email
                //Account us = ctx.Accounts.Where(p => p.Email == model.Email.ToString()).FirstOrDefault();
                //if (us != null)
                //{
                //    Response.Write("<script LANGUAGE='JavaScript' >alert('Email đã tồn tại.')</script>");
                //}
                //else
                //{

                //Account u = new Account();
                //u.Username = model.Username;

                //Mã hóa password
                //u.Password = StringUtils.MD5(model.Password);

                //u.Email = model.Email;

                try
                {
                    ctx.Accounts.Add(model);
                    ctx.SaveChanges();

                    @ViewBag.Error = false;


                    Login(model);

                    Response.Write("<script LANGUAGE='JavaScript' >alert('Đăng ký thành công. Đang chuyển về trang chủ')</script>");
                    return RedirectToAction("Index", "Home");
                }
                catch (Exception ex)
                {
                    Response.Write("<script LANGUAGE='JavaScript' >alert('Lỗi.')</script>"+ex.ToString());
                }


            }

            return View(model);
        }

    }
}