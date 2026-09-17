from .models import Job

def job_create(*, title, area, description, min_experience_years,
                required_skills, desired_skills, education_level, status) -> Job:
    return Job.objects.create(
        title=title,
        area=area,
        description=description,
        min_experience_years=min_experience_years,
        required_skills=required_skills,
        desired_skills=desired_skills,
        education_level=education_level,
        status=status,
    )

def job_update(*, job: Job, **fields) -> Job:
    for attr, value in fields.items():
        setattr(job, attr, value)
    job.save()
    return job

def job_delete(*, job: Job) -> None:
    job.delete()