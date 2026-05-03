import { render, screen, fireEvent } from '@testing-library/react';
import { ProcessCard } from '@/components/ProcessCard';
import { UserPlus } from 'lucide-react';
import { describe, it, expect, vi } from 'vitest';

describe('ProcessCard', () => {
  const mockOnClick = vi.fn();
  const defaultProps = {
    id: 'test-id',
    index: 0,
    icon: UserPlus,
    title: 'Test Step',
    description: 'Test Description',
    learnMoreText: 'Learn More',
    electionType: 'General',
    colorClass: 'text-blue',
    bgClass: 'bg-blue',
    onClick: mockOnClick,
  };

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders title and description', () => {
    render(<ProcessCard {...defaultProps} />);
    expect(screen.getByText('Test Step')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(<ProcessCard {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when Enter key is pressed', () => {
    render(<ProcessCard {...defaultProps} />);
    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('has correct accessibility attributes', () => {
    render(<ProcessCard {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('tabIndex', '0');
    expect(button).toHaveAttribute('aria-label', expect.stringContaining('Test Step'));
  });
});
