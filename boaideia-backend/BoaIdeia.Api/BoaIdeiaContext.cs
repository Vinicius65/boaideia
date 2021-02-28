using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BoaIdeia.Api.Models
{
    public class BoaIdeiaContext : DbContext
    {
        public BoaIdeiaContext() { }
        public BoaIdeiaContext(DbContextOptions<BoaIdeiaContext> options) : base(options) { }

        public virtual DbSet<Goal> Timelines { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Address> Addresses { get; set; }
        public virtual DbSet<ProjectUser> ProjectUser { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Project>(entity => {
                entity.ToTable("project");

                entity.HasKey(p => p.Id);
                entity.Property(p => p.Id).HasColumnName("id");

                entity.Property(p => p.Name).HasColumnName("name").HasMaxLength(200).IsRequired();
                entity.Property(p => p.Description).HasColumnName("description").HasMaxLength(500).IsRequired();
                entity.Property(p => p.StartDate).HasColumnName("start_date").HasColumnType("Date").IsRequired();
                entity.Property(p => p.EndDate).HasColumnName("end_date").HasColumnType("Date");
                entity.Property(p => p.ExpectedEndDate).HasColumnName("expected_end_date").HasColumnType("Date").IsRequired();
                entity.Property(p => p.IsPrivate).HasColumnName("is_privite").HasDefaultValue(false).IsRequired();

                entity.OwnsOne(p => p.RelevanceRank).Property(p => p.Rank).HasColumnName("relevance_rank").IsRequired();
                entity.OwnsOne(p => p.RelevanceRank).Property(p => p.NumberOfVotation).HasColumnName("number_of_votation").IsRequired();
            });

            builder.Entity<Goal>(entity => {
                entity.ToTable("goal");

                entity.HasKey(p => p.Id);
                entity.Property(p => p.Id).HasColumnName("id");
                entity.Property(p => p.IdProject).HasColumnName("id_project");

                entity.Property(p => p.Name).HasColumnName("name").HasMaxLength(200).IsRequired();
                entity.Property(p => p.Description).HasColumnName("description").HasMaxLength(500).IsRequired();
                entity.Property(p => p.StartDate).HasColumnName("start_date").HasColumnType("Date").IsRequired();
                entity.Property(p => p.EndDate).HasColumnName("end_date").HasColumnType("Date");

                entity.HasOne(p => p.Project).WithMany(p => p.Timeline).HasForeignKey(p => p.IdProject);
            });

            builder.Entity<Address>(entity =>
            {
                entity.ToTable("address");

                entity.HasKey(p => p.Id);
                entity.Property(p => p.Id).HasColumnName("id");
                entity.Property(p => p.IdProject).HasColumnName("id_project");

                entity.Property(p => p.Neighborhood).HasColumnName("neighborhood").HasMaxLength(200);
                entity.Property(p => p.City).HasColumnName("city").HasMaxLength(200);
                entity.Property(p => p.State).HasColumnName("state").HasMaxLength(100);
                entity.Property(p => p.Country).HasColumnName("country").HasMaxLength(100).IsRequired();

                entity.OwnsOne(p => p.TypeReach).Property(p => p.Value).HasColumnName("type_reach").HasMaxLength(30).IsRequired();

                entity.HasOne(p => p.Project).WithMany(p => p.Addresses).HasForeignKey(p => p.IdProject);
            });

            builder.Entity<ProjectUser>(entity =>
            {
                entity.ToTable("project_user");

                entity.HasKey(p => new { p.IdProject, p.IdUser });
                entity.Property(p => p.IdProject).HasColumnName("id_project");
                entity.Property(p => p.IdUser).HasColumnName("id_user");

                entity.Property(p => p.EntryDate).HasColumnName("entry_date").HasColumnType("Date").IsRequired();
                entity.Property(p => p.DepartureDate).HasColumnName("departure_date").HasColumnType("Date");

                entity.Property(p => p.TypePermission).HasColumnName("type_permission").HasMaxLength(30).IsRequired();

                entity.HasOne(p => p.User).WithMany(p => p.Projects).HasForeignKey(p => p.IdUser);
                entity.HasOne(p => p.Project).WithMany(p => p.Users).HasForeignKey(p => p.IdProject);
            });

            builder.Entity<User>(entity => {
                entity.ToTable("user");

                entity.HasKey(p => p.Id);
                entity.Property(p => p.Id).HasColumnName("id");

                entity.Property(p => p.Name).HasColumnName("name").HasMaxLength(200).IsRequired();

                entity.Property(p => p.Password).HasColumnName("password").HasMaxLength(100).IsRequired();
                entity.Property(p => p.Github).HasColumnName("github").HasMaxLength(200);
                entity.Property(p => p.Stackoverflow).HasColumnName("stackoverflow").HasMaxLength(200);

                entity.OwnsOne(p => p.Email).Property(p => p.Value).HasColumnName("email").HasMaxLength(200).IsRequired();
                entity.OwnsOne(p => p.SocialRank).Property(p => p.Rank).HasColumnName("social_rank").IsRequired();
                entity.OwnsOne(p => p.SocialRank).Property(p => p.NumberOfVotation).HasColumnName("number_of_votation").IsRequired();

            });
        }
    }
}
