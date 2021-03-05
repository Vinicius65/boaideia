﻿// <auto-generated />
using System;
using BoaIdeia.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace BoaIdeia.Api.Migrations
{
    [DbContext(typeof(BoaIdeiaContext))]
    partial class BoaIdeiaContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.12")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("BoaIdeia.Api.Models.Address", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("City")
                        .HasColumnName("city")
                        .HasColumnType("character varying(200)")
                        .HasMaxLength(200);

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnName("country")
                        .HasColumnType("character varying(100)")
                        .HasMaxLength(100);

                    b.Property<long>("IdProject")
                        .HasColumnName("id_project")
                        .HasColumnType("bigint");

                    b.Property<string>("Neighborhood")
                        .HasColumnName("neighborhood")
                        .HasColumnType("character varying(200)")
                        .HasMaxLength(200);

                    b.Property<string>("State")
                        .HasColumnName("state")
                        .HasColumnType("character varying(100)")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.HasIndex("IdProject");

                    b.ToTable("address");
                });

            modelBuilder.Entity("BoaIdeia.Api.Models.Goal", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnName("description")
                        .HasColumnType("character varying(500)")
                        .HasMaxLength(500);

                    b.Property<DateTime?>("EndDate")
                        .HasColumnName("end_date")
                        .HasColumnType("Date");

                    b.Property<DateTime>("ExpectedEndDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<long>("IdProject")
                        .HasColumnName("id_project")
                        .HasColumnType("bigint");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnName("name")
                        .HasColumnType("character varying(200)")
                        .HasMaxLength(200);

                    b.Property<DateTime>("StartDate")
                        .HasColumnName("start_date")
                        .HasColumnType("Date");

                    b.HasKey("Id");

                    b.HasIndex("IdProject");

                    b.ToTable("goal");
                });

            modelBuilder.Entity("BoaIdeia.Api.Models.Project", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnName("description")
                        .HasColumnType("character varying(500)")
                        .HasMaxLength(500);

                    b.Property<DateTime?>("EndDate")
                        .HasColumnName("end_date")
                        .HasColumnType("Date");

                    b.Property<DateTime>("ExpectedEndDate")
                        .HasColumnName("expected_end_date")
                        .HasColumnType("Date");

                    b.Property<bool>("IsPrivate")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("is_privite")
                        .HasColumnType("boolean")
                        .HasDefaultValue(false);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnName("name")
                        .HasColumnType("character varying(200)")
                        .HasMaxLength(200);

                    b.Property<DateTime>("StartDate")
                        .HasColumnName("start_date")
                        .HasColumnType("Date");

                    b.HasKey("Id");

                    b.ToTable("project");
                });

            modelBuilder.Entity("BoaIdeia.Api.Models.ProjectUser", b =>
                {
                    b.Property<long>("IdProject")
                        .HasColumnName("id_project")
                        .HasColumnType("bigint");

                    b.Property<long>("IdUser")
                        .HasColumnName("id_user")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("DepartureDate")
                        .HasColumnName("departure_date")
                        .HasColumnType("Date");

                    b.Property<DateTime>("EntryDate")
                        .HasColumnName("entry_date")
                        .HasColumnType("Date");

                    b.Property<string>("TypePermission")
                        .IsRequired()
                        .HasColumnName("type_permission")
                        .HasColumnType("character varying(30)")
                        .HasMaxLength(30);

                    b.HasKey("IdProject", "IdUser");

                    b.HasIndex("IdUser");

                    b.ToTable("project_user");
                });

            modelBuilder.Entity("BoaIdeia.Api.Models.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Github")
                        .HasColumnName("github")
                        .HasColumnType("character varying(200)")
                        .HasMaxLength(200);

                    b.Property<string>("GithubId")
                        .HasColumnName("github_id")
                        .HasColumnType("character varying(500)")
                        .HasMaxLength(500);

                    b.Property<string>("Google")
                        .HasColumnName("google")
                        .HasColumnType("character varying(200)")
                        .HasMaxLength(200);

                    b.Property<string>("GoogleId")
                        .HasColumnName("google_id")
                        .HasColumnType("character varying(500)")
                        .HasMaxLength(500);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnName("name")
                        .HasColumnType("character varying(200)")
                        .HasMaxLength(200);

                    b.Property<string>("Password")
                        .HasColumnName("password")
                        .HasColumnType("character varying(100)")
                        .HasMaxLength(100);

                    b.Property<string>("Stackoverflow")
                        .HasColumnName("stackoverflow")
                        .HasColumnType("character varying(200)")
                        .HasMaxLength(200);

                    b.Property<string>("StackoverflowId")
                        .HasColumnName("stackoverflow_id")
                        .HasColumnType("character varying(500)")
                        .HasMaxLength(500);

                    b.HasKey("Id");

                    b.ToTable("user");
                });

            modelBuilder.Entity("BoaIdeia.Api.Models.Address", b =>
                {
                    b.HasOne("BoaIdeia.Api.Models.Project", "Project")
                        .WithMany("Addresses")
                        .HasForeignKey("IdProject")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.OwnsOne("BoaIdeia.Api.ValueObject.TypeReachVO", "TypeReach", b1 =>
                        {
                            b1.Property<long>("AddressId")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("bigint")
                                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                            b1.Property<string>("Value")
                                .IsRequired()
                                .HasColumnName("type_reach")
                                .HasColumnType("character varying(30)")
                                .HasMaxLength(30);

                            b1.HasKey("AddressId");

                            b1.ToTable("address");

                            b1.WithOwner()
                                .HasForeignKey("AddressId");
                        });
                });

            modelBuilder.Entity("BoaIdeia.Api.Models.Goal", b =>
                {
                    b.HasOne("BoaIdeia.Api.Models.Project", "Project")
                        .WithMany("Timeline")
                        .HasForeignKey("IdProject")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BoaIdeia.Api.Models.Project", b =>
                {
                    b.OwnsOne("BoaIdeia.Api.ValueObject.RankVO", "RelevanceRank", b1 =>
                        {
                            b1.Property<long>("ProjectId")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("bigint")
                                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                            b1.Property<long>("NumberOfVotation")
                                .HasColumnName("number_of_votation")
                                .HasColumnType("bigint");

                            b1.Property<decimal>("Rank")
                                .HasColumnName("relevance_rank")
                                .HasColumnType("numeric");

                            b1.HasKey("ProjectId");

                            b1.ToTable("project");

                            b1.WithOwner()
                                .HasForeignKey("ProjectId");
                        });
                });

            modelBuilder.Entity("BoaIdeia.Api.Models.ProjectUser", b =>
                {
                    b.HasOne("BoaIdeia.Api.Models.Project", "Project")
                        .WithMany("Users")
                        .HasForeignKey("IdProject")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BoaIdeia.Api.Models.User", "User")
                        .WithMany("Projects")
                        .HasForeignKey("IdUser")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BoaIdeia.Api.Models.User", b =>
                {
                    b.OwnsOne("BoaIdeia.Api.ValueObject.EmailVO", "Email", b1 =>
                        {
                            b1.Property<long>("UserId")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("bigint")
                                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                            b1.Property<string>("Value")
                                .IsRequired()
                                .HasColumnName("email")
                                .HasColumnType("character varying(200)")
                                .HasMaxLength(200);

                            b1.HasKey("UserId");

                            b1.ToTable("user");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.OwnsOne("BoaIdeia.Api.ValueObject.RankVO", "SocialRank", b1 =>
                        {
                            b1.Property<long>("UserId")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("bigint")
                                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                            b1.Property<long>("NumberOfVotation")
                                .HasColumnName("number_of_votation")
                                .HasColumnType("bigint");

                            b1.Property<decimal>("Rank")
                                .HasColumnName("social_rank")
                                .HasColumnType("numeric");

                            b1.HasKey("UserId");

                            b1.ToTable("user");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
