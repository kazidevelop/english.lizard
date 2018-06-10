using Microsoft.EntityFrameworkCore;

namespace apisee.Models
{
    public class ChiggyContext : DbContext
    {
        public ChiggyContext()
        {
        }

        public ChiggyContext(DbContextOptions<ChiggyContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Tblquestions> Tblquestions { get; set; }
        public virtual DbSet<Tblsets> Tblsets { get; set; }
        public virtual DbSet<TblSubjects> TblSubjects { get; set; }
        public virtual DbSet<Tbluseranswers> Tbluseranswers { get; set; }
        public virtual DbSet<TblUsers> TblUsers { get; set; }

//        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
//                optionsBuilder.UseSqlServer("Server=.;Database=Chiggy;Trusted_Connection=True;");
//            }
//        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tblquestions>(entity =>
            {
                entity.HasKey(e => e.QuestionId);

                entity.ToTable("tblquestions");

                entity.Property(e => e.QuestionId).HasColumnName("QuestionID");

                entity.Property(e => e.Choice1)
                    .IsRequired()
                    .HasColumnName("Choice_1");

                entity.Property(e => e.Choice2)
                    .IsRequired()
                    .HasColumnName("Choice_2");

                entity.Property(e => e.Choice3)
                    .IsRequired()
                    .HasColumnName("Choice_3");

                entity.Property(e => e.Choice4)
                    .IsRequired()
                    .HasColumnName("Choice_4");

                entity.Property(e => e.Choice5).HasColumnName("Choice_5");

                entity.Property(e => e.Choice6).HasColumnName("Choice_6");

                entity.Property(e => e.CorrectAnswerNo).HasColumnName("Correct_Answer_no");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FkSetId).HasColumnName("FK_SetID");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Question).IsRequired();

                entity.HasOne(d => d.FkSet)
                    .WithMany(p => p.Tblquestions)
                    .HasForeignKey(d => d.FkSetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FKSub_tblsets_SetID");
            });

            modelBuilder.Entity<Tblsets>(entity =>
            {
                entity.HasKey(e => e.SetId);

                entity.ToTable("tblsets");

                entity.Property(e => e.SetId).HasColumnName("SetID");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FkSubjectId).HasColumnName("FK_SubjectID");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.NoSetOfQuestions)
                    .HasColumnName("No_SetOfQuestions")
                    .HasMaxLength(250);

                entity.Property(e => e.SetName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.FkSubject)
                    .WithMany(p => p.Tblsets)
                    .HasForeignKey(d => d.FkSubjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FKSub_tblsubjects_Subject_ID");
            });

            modelBuilder.Entity<TblSubjects>(entity =>
            {
                entity.HasKey(e => e.SubjectId);

                entity.ToTable("tblSubjects");

                entity.Property(e => e.SubjectId).HasColumnName("SubjectID");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.SubjectDescription).HasMaxLength(250);

                entity.Property(e => e.SubjectName)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Tbluseranswers>(entity =>
            {
                entity.HasKey(e => e.UserAnswerId);

                entity.ToTable("tbluseranswers");

                entity.Property(e => e.UserAnswerId).HasColumnName("UserAnswerID");

                entity.Property(e => e.AnswerNo).HasColumnName("Answer_no");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FkQuestionid).HasColumnName("FK_Questionid");

                entity.Property(e => e.FkUserId).HasColumnName("FK_UserID");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.FkQuestion)
                    .WithMany(p => p.Tbluseranswers)
                    .HasForeignKey(d => d.FkQuestionid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FKSub_tblquestions_questionid");

                entity.HasOne(d => d.FkUser)
                    .WithMany(p => p.Tbluseranswers)
                    .HasForeignKey(d => d.FkUserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FKSub_tblusers_Userid");
            });

            modelBuilder.Entity<TblUsers>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.ToTable("tblUsers");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Dob)
                    .HasColumnName("DOB")
                    .HasColumnType("datetime");

                entity.Property(e => e.FirstName).IsRequired();

                entity.Property(e => e.Gender)
                    .IsRequired()
                    .HasMaxLength(1);

                entity.Property(e => e.Lastname).IsRequired();

                entity.Property(e => e.Middlename).IsRequired();

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Password).IsRequired();

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50);
            });
        }
    }
}