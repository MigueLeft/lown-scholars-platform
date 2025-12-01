import Link from 'next/link';
import { Chip } from '@mui/material';

interface FormStats {
  id: string;
  title: string;
  description: string;
  status: 'Active' | 'Inactive';
  totalResponses: number;
  createdDate: string;
  lastModified: string;
  questions: {
    id: string;
    question: string;
    type: string;
    responses: number;
  }[];
  responsesByDate: {
    date: string;
    count: number;
  }[];
}

// Mock form statistics data
const mockFormStats: Record<string, FormStats> = {
  '1': {
    id: '1',
    title: 'Initial Patient Assessment',
    description: 'Comprehensive health screening and intake form for new patients',
    status: 'Active',
    totalResponses: 127,
    createdDate: '2024-01-10',
    lastModified: '2024-03-15',
    questions: [
      { id: 'q1', question: 'What is your current health status?', type: 'Multiple Choice', responses: 127 },
      { id: 'q2', question: 'Do you have any chronic conditions?', type: 'Yes/No', responses: 127 },
      { id: 'q3', question: 'List any current medications', type: 'Text', responses: 98 },
      { id: 'q4', question: 'Do you have health insurance?', type: 'Yes/No', responses: 127 },
      { id: 'q5', question: 'Rate your overall well-being', type: 'Scale (1-10)', responses: 125 },
    ],
    responsesByDate: [
      { date: '2024-03-01', count: 12 },
      { date: '2024-03-05', count: 15 },
      { date: '2024-03-10', count: 18 },
      { date: '2024-03-15', count: 14 },
    ],
  },
  '2': {
    id: '2',
    title: 'Mental Health Evaluation',
    description: 'Psychological well-being assessment for ongoing care',
    status: 'Active',
    totalResponses: 89,
    createdDate: '2024-01-20',
    lastModified: '2024-03-10',
    questions: [
      { id: 'q1', question: 'How often do you feel anxious?', type: 'Scale (1-10)', responses: 89 },
      { id: 'q2', question: 'Describe your sleep patterns', type: 'Text', responses: 87 },
      { id: 'q3', question: 'Do you have access to mental health support?', type: 'Yes/No', responses: 89 },
      { id: 'q4', question: 'Rate your stress level', type: 'Scale (1-10)', responses: 88 },
    ],
    responsesByDate: [
      { date: '2024-03-01', count: 8 },
      { date: '2024-03-05', count: 11 },
      { date: '2024-03-10', count: 9 },
    ],
  },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function FormStatisticsPage({ params }: PageProps) {
  const { id } = await params;
  const form = mockFormStats[id];

  if (!form) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-heading)' }}>
          Form Not Found
        </h1>
        <Link href="/forms" className="text-base" style={{ color: 'var(--color-brand-crimson)' }}>
          Return to Forms
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'var(--color-brand-blue)' : 'var(--color-subtle)';
  };

  const completionRate = form.questions.reduce((acc, q) => acc + q.responses, 0) / (form.questions.length * form.totalResponses) * 100;

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-lora)' }}>
        <Link
          href="/forms"
          className="text-sm font-medium hover:underline"
          style={{ color: 'var(--color-brand-crimson)' }}
        >
          Forms
        </Link>
        <span style={{ color: 'var(--color-subtle)' }}>/</span>
        <span className="text-sm font-medium" style={{ color: 'var(--color-subtle)' }}>
          Statistics
        </span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2 normal-case" style={{ color: 'var(--color-brand-crimson)' }}>
              {form.title}
            </h1>
            <p className="text-base mb-3" style={{ color: 'var(--color-subtle)' }}>
              {form.description}
            </p>
          </div>
          <Chip
            label={form.status}
            sx={{
              backgroundColor: `${getStatusColor(form.status)}15`,
              color: getStatusColor(form.status),
              fontWeight: 600,
              fontSize: '0.875rem',
              ml: 2,
            }}
          />
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <div className="card-harvard p-6">
          <p className="text-sm font-medium mb-2" style={{ color: 'var(--color-subtle)' }}>
            Total Responses
          </p>
          <p className="text-4xl font-bold" style={{ color: 'var(--color-brand-crimson)' }}>
            {form.totalResponses}
          </p>
        </div>

        <div className="card-harvard p-6">
          <p className="text-sm font-medium mb-2" style={{ color: 'var(--color-subtle)' }}>
            Total Questions
          </p>
          <p className="text-4xl font-bold" style={{ color: 'var(--color-brand-blue)' }}>
            {form.questions.length}
          </p>
        </div>

        <div className="card-harvard p-6">
          <p className="text-sm font-medium mb-2" style={{ color: 'var(--color-subtle)' }}>
            Completion Rate
          </p>
          <p className="text-4xl font-bold" style={{ color: 'var(--color-brand-yellow)' }}>
            {completionRate.toFixed(1)}%
          </p>
        </div>

        <div className="card-harvard p-6">
          <p className="text-sm font-medium mb-2" style={{ color: 'var(--color-subtle)' }}>
            Last Modified
          </p>
          <p className="text-lg font-bold" style={{ color: 'var(--color-heading)' }}>
            {new Date(form.lastModified).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Response Timeline */}
      <div className="card-harvard p-6 mb-6">
        <h2 className="text-xl font-bold mb-6 normal-case" style={{ color: 'var(--color-heading)' }}>
          Response Timeline
        </h2>
        <div className="space-y-4">
          {form.responsesByDate.map((item, index) => {
            const maxCount = Math.max(...form.responsesByDate.map(r => r.count));
            const percentage = (item.count / maxCount) * 100;

            return (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium" style={{ color: 'var(--color-body)' }}>
                    {new Date(item.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="text-sm font-bold" style={{ color: 'var(--color-brand-crimson)' }}>
                    {item.count} responses
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: 'var(--color-brand-crimson)',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Questions Overview */}
      <div className="card-harvard p-6">
        <h2 className="text-xl font-bold mb-6 normal-case" style={{ color: 'var(--color-heading)' }}>
          Questions Overview
        </h2>
        <div className="space-y-6">
          {form.questions.map((question, index) => {
            const responseRate = (question.responses / form.totalResponses) * 100;

            return (
              <div
                key={question.id}
                className="pb-6 border-b border-gray-200 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <span
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold flex-shrink-0"
                        style={{
                          backgroundColor: 'rgba(165, 28, 48, 0.1)',
                          color: 'var(--color-brand-crimson)',
                        }}
                      >
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold" style={{ color: 'var(--color-heading)' }}>
                          {question.question}
                        </h3>
                        <p className="text-sm mt-1" style={{ color: 'var(--color-subtle)' }}>
                          Type: {question.type}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ml-0 sm:ml-11">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm" style={{ color: 'var(--color-body)' }}>
                      Response rate
                    </span>
                    <span className="text-sm font-bold" style={{ color: 'var(--color-brand-blue)' }}>
                      {question.responses} / {form.totalResponses} ({responseRate.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${responseRate}%`,
                        backgroundColor: 'var(--color-brand-blue)',
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
