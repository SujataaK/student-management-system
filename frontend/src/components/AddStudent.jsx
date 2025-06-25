import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentContext } from '../context/StudentContext';

const courseOptions = [
  'Mern Stack Development',
  'Digital Marketing',
  'Flutter',
  'Data Analytics',
  'Web Designing',
  'Graphic Designing',
  'UI/UX',
  'QA Analysis',
  'Python',
  'Machine Learning'
];

const AddStudent = () => {
  const { addStudent } = useContext(StudentContext);
  const nav = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName : '',
    email    : '',
    age      : '',
    course   : ''
  });

  const [msg , setMsg ] = useState('');
  const [err , setErr ] = useState('');

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit  = async e => {
    e.preventDefault();

    if (Object.values(form).some(v => !v)) {
      setErr('Please fill in every field.'); setMsg(''); return;
    }
    const payload = {
      name : `${form.firstName.trim()} ${form.lastName.trim()}`,
      email: form.email,
      age  : form.age,
      course: form.course
    };
    const res = await addStudent(payload);
    if (res.success) {
      setMsg('Student added!'); setErr('');
      setTimeout(() => nav('/'), 900);
    } else {
      setErr(res.message); setMsg('');
    }
  };


  return (
    <div className="container-fluid px-3 px-lg-4 mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8 col-xl-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title mb-3 text-center">Add New Student</h4>

              {msg && <div className="alert alert-success py-2">{msg}</div>}
              {err && <div className="alert alert-danger  py-2">{err}</div>}

              <form onSubmit={submit}>
                <div className="row gy-3">
                  <div className="col-12 col-md-6">
                    <input
                      name="firstName"
                      className="form-control"
                      placeholder="First Name"
                      value={form.firstName}
                      onChange={handle}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <input
                      name="lastName"
                      className="form-control"
                      placeholder="Last Name"
                      value={form.lastName}
                      onChange={handle}
                    />
                  </div>

                  <div className="col-12">
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={form.email}
                      onChange={handle}
                    />
                  </div>

                  <div className="col-6 col-md-4">
                    <input
                      name="age"
                      type="number"
                      min="1"
                      className="form-control"
                      placeholder="Age"
                      value={form.age}
                      onChange={handle}
                    />
                  </div>

                  <div className="col-12 col-md-8">
                    <select
                      name="course"
                      className="form-select"
                      value={form.course}
                      onChange={handle}
                    >
                      <option value="">Select Course…</option>
                      {courseOptions.map(c => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="d-flex gap-2 mt-4">
                  <button className="btn btn-success flex-fill">Add Student</button>
                  <button
                    type="button"
                    className="btn btn-secondary flex-fill"
                    onClick={() => nav('/')}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
