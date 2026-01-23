from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('courseaffils', '0001_initial'),
        ('main', '0002_answer_active_quizsubmission_active'),
    ]

    operations = [
        migrations.CreateModel(
            name='SimulationVisibility',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('simulation', models.IntegerField(choices=[(1, 'Simulation 1'), (2, 'Simulation 2'), (3, 'Simulation 3'), (4, 'Simulation 4'), (5, 'Simulation 5'), (6, 'Simulation 6'), (7, 'Simulation 7')])),
                ('is_visible', models.BooleanField(default=False)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courseaffils.Course')),
            ],
            options={
                'verbose_name_plural': 'Simulation Visibilities',
                'unique_together': {('course', 'simulation')},
            },
        ),
    ]
