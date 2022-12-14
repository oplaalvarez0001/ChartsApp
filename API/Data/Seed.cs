using System.Text.Json;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        //public static async Task SeedUsers(DataContext context)
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");

            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            var roles = new List<AppRole>{
                new AppRole{Name="Member"},
                new AppRole{Name="Admin"},
                new AppRole{Name="Moderator"}
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                // using var hmac = new HMACSHA512();

                user.UserName = user.UserName.ToLower();

                // user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pass123"));

                // user.PasswordSalt = hmac.Key;

                //context.Users.Add(user);

                await userManager.CreateAsync(user, "Pass123");

                await userManager.AddToRoleAsync(user, "Member");
            }

            var admin = new AppUser{
                UserName="admin"
            };

            await userManager.CreateAsync(admin,"Pass123");
            await userManager.AddToRolesAsync(admin, new []{"Admin","Moderator"});

            //          await context.SaveChangesAsync();

        }
    }
}